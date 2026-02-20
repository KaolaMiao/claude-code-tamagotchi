import https from 'https';
import { config } from '../utils/config';

export interface UsageResult {
  tokenPercentage: number;
  mcpPercentage?: number;
  platform: 'ZAI' | 'ZHIPU';
  timestamp: number;
}

export interface UsageQueryClientOptions {
  authToken: string;
  baseUrl: string;
  timeout?: number;
}

/**
 * Client for querying GLM Coding Plan usage statistics
 * Supports both ZAI (api.z.ai) and ZHIPU (open.bigmodel.cn) platforms
 */
export class UsageQueryClient {
  private authToken: string;
  private baseUrl: string;
  private quotaLimitUrl: string;
  private platform: 'ZAI' | 'ZHIPU';
  private timeout: number;

  constructor(options: UsageQueryClientOptions) {
    this.authToken = options.authToken;
    this.baseUrl = options.baseUrl;
    this.timeout = options.timeout || 5000;

    // Validate and parse base URL
    const parsedBaseUrl = new URL(this.baseUrl);
    const baseDomain = `${parsedBaseUrl.protocol}//${parsedBaseUrl.host}`;

    if (this.baseUrl.includes('api.z.ai')) {
      this.platform = 'ZAI';
      this.quotaLimitUrl = `${baseDomain}/api/monitor/usage/quota/limit`;
    } else if (this.baseUrl.includes('open.bigmodel.cn') || this.baseUrl.includes('dev.bigmodel.cn')) {
      this.platform = 'ZHIPU';
      this.quotaLimitUrl = `${baseDomain}/api/monitor/usage/quota/limit`;
    } else {
      throw new Error(`Unrecognized ANTHROPIC_BASE_URL: ${this.baseUrl}`);
    }
  }

  /**
   * Query current token usage percentage
   * Returns the TOKENS_LIMIT percentage (5-hour rolling window)
   */
  async queryTokenUsage(): Promise<UsageResult> {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(this.quotaLimitUrl);
      const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname,
        method: 'GET',
        headers: {
          'Authorization': this.authToken,
          'Accept-Language': 'en-US,en',
          'Content-Type': 'application/json'
        }
      };

      const timeoutId = setTimeout(() => {
        req.destroy();
        reject(new Error('Usage query timeout'));
      }, this.timeout);

      const req = https.request(options, (res) => {
        clearTimeout(timeoutId);
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode !== 200) {
            return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }

          try {
            const json = JSON.parse(data);
            const limits = json.data?.limits || [];

            // Find TOKENS_LIMIT entry
            const tokenLimit = limits.find((item: any) => item.type === 'TOKENS_LIMIT');

            if (tokenLimit && typeof tokenLimit.percentage === 'number') {
              // Convert usage to remaining percentage (100% - usage%)
              const remainingPercentage = Math.round(100 - tokenLimit.percentage);
              resolve({
                tokenPercentage: remainingPercentage,
                platform: this.platform,
                timestamp: Date.now()
              });
            } else {
              reject(new Error('TOKENS_LIMIT not found in response'));
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error}`));
          }
        });
      });

      req.on('error', (error) => {
        clearTimeout(timeoutId);
        reject(error);
      });

      req.end();
    });
  }

  /**
   * Create client from environment variables
   */
  static fromEnv(): UsageQueryClient | null {
    const authToken = process.env.ANTHROPIC_AUTH_TOKEN;
    const baseUrl = process.env.ANTHROPIC_BASE_URL;

    if (!authToken || !baseUrl) {
      return null;
    }

    try {
      return new UsageQueryClient({ authToken, baseUrl });
    } catch (error) {
      if (config.debugMode) {
        console.error('Failed to create UsageQueryClient:', error);
      }
      return null;
    }
  }

  /**
   * Test if the client is configured correctly
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.queryTokenUsage();
      return true;
    } catch (error) {
      if (config.debugMode) {
        console.error('Usage query connection test failed:', error);
      }
      return false;
    }
  }
}
