/**
 * @interface IRectPlotConfig
 * Represents the configuration of a rectangle with optional position (x, y) and dimensions (width, height).
 * @property {number} [y] - The optional y-coordinate of the rectangle's top-left corner.
 * @property {number} [x] - The optional x-coordinate of the rectangle's top-left corner.
 * @property {number} width - The width of the rectangle.
 * @property {number} height - The height of the rectangle.
 */
export interface IRectPlotConfig {
  y?: number;
  x?: number;
  width: number;
  height: number;
}

/**
 * @interface ISquareSize
 * Represents the size of a square or rectangle, with a defined width and height.
 * @property {number} width - The width of the square or rectangle.
 * @property {number} height - The height of the square or rectangle.
 */
export interface ISquareSize {
  width: number;
  height: number;
}

/**
 * @interface IPaperLayoutSizing
 * Defines the sizing for various components of the paper layout, such as source, target, and margins.
 *              It is an object where each key (string) maps to an `ISquareSize` object.
 * @property {[key: string]: ISquareSize} [key] - An object where keys (e.g., "source," "target," "margin") map to ISquareSize objects.
 */
export interface IPaperLayoutSizing {
  [key: string]: ISquareSize;
}

/**
 * @interface ILayoutConfig
 * {@link ILayoutConfig}
 * Configures the visual aspects of the paper layout, including colors, fonts, and line widths.
 * @property {string} [paperColor] - The background color of the paper. Defaults to 'rgb(233, 229, 229)'.
 * @property {string} [strokeColor] - The color of the rectangle outlines. Defaults to 'rgb(85, 85, 85)'.
 * @property { size: number; unit: string; family: string; } [fonts] - The font settings. 
 * @property {string} [fontSize] - The font size for numbering the inner rectangles. Defaults to '3px'.
 * @property {string} [fontFamily] - The font family for text. Defaults to 'sans-serif'.
 * @property {string} [textColor] - The color of the text inside the inner rectangles. Defaults to 'rgb(85, 85, 85)'.
 * @property {number} [lineWidth] - The width of the lines for the outlines. Defaults to 1.
 * @property {string} [mainOuterColor] - The fill color of the main outer rectangles. Defaults to 'skyblue'. valid css color
 * @property {string} [mainInnerColor] - The fill color of the main inner rectangles. Defaults to 'lightgreen'. valid css color
 * @property {string} [remainOuterColor] - The fill color of the remaining outer rectangles. Defaults to 'lightsalmon'. valid css color
 * @property {string} [remainInnerColor] - The fill color of the remaining inner rectangles. Defaults to 'lightcoral'. valid css color
 * @property {number} [ratio] - The aspect ratio of the rectangles. Defaults to 1 (affects both width and height quality). 
 * @see {@link https://www.w3.org/wiki/CSS/Properties/color/keywords Click here}, to learn CSS valid color string.
 * 
 * 
 */
export interface ILayoutConfig {
  fonts?: { size?: number; unit?: string; family?: string; };
  textColor?: string;
  lineWidth?: number;
  strokeColor?: string;
  paperColor?: string;
  mainOuterColor?: string;
  mainInnerColor?: string;
  remainOuterColor?: string;
  remainInnerColor?: string;
  ratio?: number;
}

/**
 * @interface IMatrixGrid
 * Represents a grid with rows, columns, and an optional container.
 * @property {number} row - The number of rows in the grid.
 * @property {number} column - The number of columns in the grid.
 * @property {IRectConfig} [container] - An optional rectangle defining the container for the grid.
 */
export interface IMatrixGrid {
  row: number;
  column: number;
  container?: IRectPlotConfig;
}

/**
 * @interface IRectMatrixResult
 * Represents the result of a single rectangle calculation within a grid.
 * @property {IRectConfig} inner - Configuration for the inner rectangle (position, dimensions).
 * @property {IRectConfig} outer - Configuration for the outer rectangle (position, dimensions).
 * @property {{ row: number; column: number }} grid - Information about the rectangle's position within the grid (row, column).
 */
export interface IRectMatrixResult {
  inner: IRectPlotConfig;
  outer: IRectPlotConfig;
  grid: { row: number; column: number; };
}

/**
 * 
 * 
 *
 * @interface ILayoutResult
 */
export interface ILayoutResult {
  main: IRectMatrixResult[];
  remain?: IRectMatrixResult[];
  [key: string]: any;
}


/**
 * 
 * 
 * 
 * @interface ILayoutInput
 */
export interface ILayoutInput {
  source: ISquareSize,
  target: ISquareSize,
  margin?: ISquareSize;
  useInline?: boolean;
}

export interface ILayoutCoords {
  x: number,
  y: number,
}