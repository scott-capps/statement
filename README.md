# Statement Logger

Statement is a powerful and flexible logging library for Node.js applications, designed to make your logs stand out. Whether you're handling simple console outputs or integrating with complex external services like S3, CloudWatch, or Grafana, Statement offers a robust solution with a hybrid class and function-based architecture.

## Features

- Customizable Log Formats: Choose from predefined formats like JSON and CSV, or define your own custom format.
- Multi-Destination Logging: Simultaneously log to multiple destinations, including local directories, cloud storage, and external monitoring tools.
- Advanced Tracing and Telemetry: Integrate with major tracing providers like OpenTelemetry and Datadog, enabling tracing of GraphQL operations and performance monitoring.
- GraphQL and Middleware Support: Seamlessly integrate with GraphQL servers and popular middleware frameworks such as Express and Koa.
- Security and Flexibility: Configure log rotation, file splitting, and secure publishing to external endpoints with built-in support for tokens and authentication.

## Usage

#### Basic Setup

Here's a simple example of how to use Statement:

```
import { StatementLogger } from 'statement-logger';

const logger = new StatementLogger({
  level: 'info',
  output: {
    rotationPolicy: 'daily',
    maxFileSize: '10MB',
    directories: ['./logs'],
    splitLogTypes: true,
  },
  logFormat: 'json',
});

logger.info('This is an info message');
logger.error('This is an error message');
```

#### Custom Log Format

You can define a custom log format by providing a custom formatter function:

```
const customLogger = new StatementLogger({
  level: 'info',
  logFormat: 'custom',
  formatterFunc: (level, message, meta) => {
    return `${new Date().toISOString()} [${level.toUpperCase()}]: ${message} ${JSON.stringify(meta)}`;
  },
});

customLogger.info('This is a custom formatted info message');
```

#### Tracing and Telemetry

Integrate tracing and telemetry with your logger:

```
const tracingLogger = new StatementLogger({
  level: 'info',
  tracing: {
    enabled: true,
    provider: 'OpenTelemetry',
    config: {
      serviceName: 'my-service',
      endpoint: 'http://localhost:14268/api/traces',
    },
    traceGraphQL: true,
    logPerformanceMetrics: true,
  },
});

tracingLogger.info('Tracing and telemetry are enabled');
```

#### GraphQL Operation Logging

Enable logging for GraphQL operations:

```
const graphqlLogger = new StatementLogger({
  level: 'info',
  graphql: {
    enabled: true,
    logLevel: 'info',
    includeDetails: true,
    logErrors: true,
  },
});

graphqlLogger.info('GraphQL operation logging is enabled');
```

#### Middleware Integration

Integrate Statement with Express or Koa:

```
import express from 'express';
import { StatementLogger } from 'statement-logger';

const app = express();
const middlewareLogger = new StatementLogger({
  level: 'info',
  middleware: {
    enabled: true,
    frameworks: ['express'],
    customMiddlewareFunc: (req, res, next) => {
      console.log(`Request URL: ${req.url}`);
      next();
    },
  },
});

app.use(middlewareLogger.middleware());
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => {
  middlewareLogger.info('Server is running on port 3000');
});
```

#### Configuration Options

Here’s a breakdown of the configuration options available in Statement:

- level: "info" | "warn" | "error" | "fatal"
- output:
  - rotationPolicy: Policy for log file rotation (e.g., "daily", "size-based").
  - maxFileSize: Maximum size of log files (e.g., "10MB").
  - directories: List of directories where logs will be stored.
  - splitLogTypes: If true, creates separate log files for each log level.
- logFormat: "json" | "csv" | "custom"
- publishTo: External sources to publish logs (S3, CloudWatch, etc.).
- formatterFunc: Custom function for formatting logs.
- tracing:
  - enabled: Enable or disable tracing.
  - provider: Tracing provider (e.g., "OpenTelemetry").
  - config: Provider-specific configuration.
  - traceGraphQL: Enable tracing for GraphQL operations.
  - logPerformanceMetrics: Enable logging of performance metrics.
- graphql:
  - enabled: Enable or disable GraphQL logging.
  - logLevel: Log level for GraphQL operations.
  - includeDetails: Include details like query names and variables.
  - logErrors: Enable logging of GraphQL errors.
- middleware:
  - enabled: Enable or disable middleware integration.
  - frameworks: List of frameworks for middleware support.
  - customMiddlewareFunc: Custom middleware function for logging.

## Contributing

Contributions are welcome! If you have ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Support

For any questions or support, please reach out via [GitHub Issues](https://github.com/scott-capps/statement/issues).
