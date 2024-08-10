/**
 * Configuration interface for the Statement logger.
 */
export interface LoggerConfig {
  /**
   * The log level that determines the severity of the logs.
   */
  level: "info" | "warn" | "error" | "fatal";

  /**
   * Configuration for local output of log files.
   */
  output: {
    /**
     * The policy for log file rotation (e.g., "daily", "size-based").
     */
    rotationPolicy: string;

    /**
     * The maximum size of log files before they are rotated.
     * This could be a string like "10MB" or "100KB".
     */
    maxFileSize: string;

    /**
     * Directories where log files will be stored locally.
     */
    directories: string[];

    /**
     * If true, each directory will contain separate log files for each log level.
     * For example, `info.json`, `warn.json`, etc.
     */
    splitLogTypes: boolean;
  };

  /**
   * The format in which logs will be recorded.
   * - `"json"`: Logs will be formatted as JSON.
   * - `"csv"`: Logs will be formatted as CSV.
   * - `"custom"`: A custom format provided by the user.
   */
  logFormat: "json" | "csv" | "custom";

  /**
   * Configuration for external sources where logs will be published.
   */
  publishTo?: Record<
    string,
    {
      /**
       * The name identifier for the external publishing destination (e.g., "S3", "CloudWatch").
       */
      name: string;

      /**
       * The type of external service (optional).
       */
      type?: string;

      /**
       * The endpoint URL where logs will be sent.
       */
      endpoint: string;

      /**
       * Optional token for authenticating with the external service.
       */
      token?: string;
    }
  >;

  /**
   * A custom formatter function that defines how logs are formatted.
   * This function is required if `logFormat` is set to `"custom"`.
   * @param args - The arguments passed to the formatter function.
   * @returns A formatted log string.
   */
  formatterFunc?: (...args: unknown[]) => string;

  /**
   * Configuration for tracing and telemetry integration.
   */
  tracing?: {
    /**
     * Enable or disable tracing.
     */
    enabled: boolean;

    /**
     * The tracing provider (e.g., "OpenTelemetry", "Jaeger", "Datadog").
     */
    provider: string;

    /**
     * Configuration specific to the tracing provider.
     */
    config: Record<string, unknown>;

    /**
     * A list of GraphQL operations to be traced.
     */
    traceGraphQL?: boolean;

    /**
     * Enable or disable logging of performance metrics (e.g., execution time, latency).
     */
    logPerformanceMetrics?: boolean;
  };

  /**
   * Configuration for GraphQL operation logging.
   */
  graphql?: {
    /**
     * Enable or disable GraphQL logging.
     */
    enabled: boolean;

    /**
     * Log level for GraphQL operations.
     */
    logLevel?: "info" | "warn" | "error" | "fatal";

    /**
     * Include details such as query names, variables, and execution time.
     */
    includeDetails?: boolean;

    /**
     * Enable or disable logging of GraphQL errors.
     */
    logErrors?: boolean;
  };

  /**
   * Configuration for middleware support.
   */
  middleware?: {
    /**
     * Enable or disable middleware integration.
     */
    enabled: boolean;

    /**
     * List of middleware to be integrated with the logger (e.g., "express", "koa").
     */
    frameworks: string[];

    /**
     * Custom middleware function for logging within the framework.
     * @param req - The incoming request object.
     * @param res - The outgoing response object.
     * @param next - The next middleware function in the stack.
     */
    customMiddlewareFunc?: (req: any, res: any, next: any) => void;
  };
}
