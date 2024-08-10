import colorizer, { CustomColorizerOptions } from "./colorizer";
import { LoggerConfig } from "./types";

export default class StatementLogger {
  config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  public error(...args: unknown[]): void {
    console.log(colorizer.error(...args));
  }
  public warn(...args: unknown[]): void {
    console.log(colorizer.warn(...args));
  }
  public info(...args: unknown[]): void {
    console.log(colorizer.info(...args));
  }
  public success(...args: unknown[]): void {
    console.log(colorizer.success(...args));
  }
  public break() {
    console.log("");
  }
  public custom(message: string, options?: CustomColorizerOptions): void {
    console.log(colorizer.custom(message, options));
  }

  public fatal(message: string): void {
    this.error(message);
    process.exit(1);
  }
}
