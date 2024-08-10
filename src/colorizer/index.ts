export interface Colorizer {
  error(...args: unknown[]): string;
  warn(...args: unknown[]): string;
  info(...args: unknown[]): string;
  success(...args: unknown[]): string;
  custom(message: string, options?: CustomColorizerOptions): string;
}

type TextStylesKeys =
  | "bold"
  | "blink"
  | "bright"
  | "dim"
  | "hidden"
  | "reset"
  | "reverse"
  | "underscore";
type TextColorsKeys =
  | "black"
  | "blue"
  | "cyan"
  | "green"
  | "magenta"
  | "red"
  | "white"
  | "yellow";
type BackgroundColorsKeys =
  | "bgBlack"
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite";

export interface CustomColorizerOptions {
  foregroundColor?: TextColorsKeys;
  backgroundColor?: keyof typeof backgroundColors;
  styles?: TextStylesKeys[];
}

const textStyles: Record<TextStylesKeys, string> = {
  bold: "\x1b[1m",
  blink: "\x1b[5m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  hidden: "\x1b[8m",
  reset: "\x1b[0m",
  reverse: "\x1b[7m",
  underscore: "\x1b[4m",
};

const textColors: Record<TextColorsKeys, string> = {
  black: "\x1b[30m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  red: "\x1b[31m",
  white: "\x1b[37m",
  yellow: "\x1b[33m",
};

const backgroundColors: Record<BackgroundColorsKeys, string> = {
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

function colorize(text: string, ...effects: string[]): string {
  const combinedEffects = effects.join("");
  return `${combinedEffects}${text}${textStyles.reset}`;
}

const colorizer: Colorizer = {
  error(...args: unknown[]) {
    return colorize(args.join(" "), textColors.red);
  },
  warn(...args: unknown[]) {
    return colorize(args.join(" "), textColors.yellow);
  },
  info(...args: unknown[]) {
    return colorize(args.join(" "), textColors.cyan);
  },
  success(...args: unknown[]) {
    return colorize(args.join(" "), textColors.green);
  },
  custom(message: string, options?: CustomColorizerOptions) {
    const { foregroundColor, backgroundColor, styles = [] } = options ?? {};

    const foreground = textColors[foregroundColor ?? textColors.white];
    const background = backgroundColors[backgroundColor ?? textColors.black];
    const appliedStyles = styles
      .map((style) => textStyles[style] ?? "")
      .join("");

    return colorize(message, foreground, background, appliedStyles);
  },
};

export default colorizer;
