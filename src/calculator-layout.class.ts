import { ILayoutConfig, ISquareSize, ILayoutInput, IRectMatrixResult, IPaperLayoutSizing, ILayoutCoords, IMatrixGrid, ILayoutResult } from "./calculator-layout.interface";


/**
 * **Version 1.0**
 * @class
 * This class is designed to calculate and visualize the optimal layout for cutting **`smaller rectangles (targets)`** from a **`larger rectangle (source/paper)`**.
 * It supports various configurations for the layout, including `margins`, `colors`, and different `output formats` such as SVG and Canvas.
 *
 * **The class provides methods to:**
 * - Calculate the optimal arrangement of target rectangles within the source rectangle.
 * - Draw the calculated layout on an **`<svg/>`** or **`<canvas/>`** element.
 * - Customize the appearance of the layout, including colors and margins.
 * - Generate the layout as a `base64` encoded **`.svg`** or **`.jpeg`** image.
 * - Reset the layout and clear the drawing area.
 *
 * **Key features include:**
 * - **Layout Calculation:** Determines the most efficient way to cut target rectangles from the source, considering margins and different cutting methods (inline or cross).
 * 
 * - **Visualization:** Renders the calculated layout on an **`<svg/>`** or **`<canvas/>`** element, allowing for visual inspection and customization.
 * 
 * - **Customization:** Supports various configuration options, such as colors for the paper, margins, and target rectangles, as well as font settings for text labels.
 * 
 * - **Output Formats:** Can generate the layout as an **`<svg/>`** element, a `base64` encoded **`.svg`** image, a **`<canvas/>`** element, or a `base64` encoded **`.jpeg`** image.
 * 
 * - **Error Handling:** Includes comprehensive validation and `error` handling to ensure the integrity of the calculations and drawings.
 * 
 * - **Reset Functionality:** Provides a method to reset the layout and clear the drawing area, allowing for new calculations and visualizations.
 *
 *  The class is intended for use in applications where efficient layout planning and visualization are required, such as in printing, packaging, or design software.
 * @author 
 * {@link !ymgh YMGH}
 * 
 * @example
 * ***[1]*** *`set` the **`param`** & **`config`**.* {@link config see here}
 * ```ts
 * 
 * // ** Class params **
 * const source = { width: 79, height: 109 };
 * const target = { width: 22, height: 32 };
 * const margin = { width: 2, height: 3 ;
 * 
 * // ** config **
 * const layoutConfig: ILayoutConfig = {
 * 
 *    paperColor: 'beige',
 *    mainInnerColor: 'lightgreen',
 *    mainOuterColor: 'skyblue',
 *    remainInnerColor: 'lightcoral',
 *    remainOuterColor: 'lightsalmon',
 * 
 * };
 * 
 * ```
 * ***[2]*** ***`run`** a calculation.* {@link calculate see here}
 *  ```ts
 * 
 * const calculator = new CalculatorLayoutClass(source, target, margin);
 * // ** Assign the `configuration` **
 * calculator.config = layoutConfig;
 * 
 * // ** Run Calculation **
 * const result = calculator.calculate();
 * console.log(`result`, result.total);
 * 
 * ```
 * ***[3]*** *get **`drawing`** a layout.* {@link drawCanvas see here} `&` {@link drawSvg here}
 * ```ts
 * 
 * // ** Drawing Layout as base64svg **
 * const svg = calculator.drawSvg();
 * console.log(`svg base64`,  svg);
 * 
 * ```
 * ***[4]*** ***`reset`** calculator* {@link reset see here}
 * ```ts
 * 
 *  calculator.reset();
 *  console.log(`svg :`, svgElement); // will be `null`.
 *  
 *  ```
 * @see
 * - How to `set` the {@link config config}.
 * - Available `interface` {@link ILayoutConfig ILayoutConfig}. 
 * - How to `perform` a calculation {@link calculate method}. 
 * - How to `get` an output as `.svg base64 encoded` or `<svg/> Element` {@link drawSvg method}.
 * - How to `get` an output as `.jpeg base64 encoded` or `<canvas/> Element` {@link drawCanvas method}. 
 */
export class CalculatorLayoutClass {

  /**
   *
   * @property {ILayoutConfig} _config - The configuration for the paper layout (colors, fonts, etc.).
   * 
   * @readonly
   * @see 
   * - `set` the {@link config config}
   * - Available `interface` {@link ILayoutConfig ILayoutConfig}. 
   */
  private _config: ILayoutConfig;
  /** 
   *
   * @property {SVGSVGElement | HTMLCanvasElement | null} _Element - The SVG or Canvas element used for drawing.
   * @see 
   * - Producing `.svg` base64 encoded or `<svg/> Element` {@link drawSvg Method}
   * - Producing `.jpeg` base64 encoded or `<canvas/> Element` {@link drawCanvas Method} 
   */
  private _Element: SVGSVGElement | HTMLCanvasElement | null = null;


  /**
   * @param {ISquareSize} [_source.width=null, _source.height=null] - The size of the source rectangle (e.g., paper).
   * @param {ISquareSize} [_target.width=null, _target.height=null] - The size of the target rectangle (e.g., the piece to cut).
   * @param {ISquareSize} [_margin.width=null, _margin.height=null] - The margin around the target rectangles. Defaults to `0` margin.
   * @param {boolean} [_useInline=true] - Flag to determine the calculation method (true: inline, false: cross). Defaults to true.
   * @throws {Error} Throws an error if source, target, or margin dimensions are invalid.
   * @defaultValue 
   * _margin = { width: 0, height: 0 };
   * _useInline = true;
   */
  constructor(
    private _source: ISquareSize,
    private _target: ISquareSize,
    private _margin: ISquareSize = { width: 0, height: 0 },
    private _useInline: boolean = true,
  ) {

    /** Assign `default configuration` for layouts generation **/
    this._config = {
      fonts: { size: 3, family: 'sans-serif', unit: 'px' },
      textColor: 'rgb(85, 85, 85)',
      lineWidth: 0.18, //default
      strokeColor: 'rgb(85, 85, 85)',
      paperColor: 'rgb(233, 229, 229)',
      mainInnerColor: 'lightgreen',
      mainOuterColor: 'skyblue',
      remainInnerColor: 'lightcoral',
      remainOuterColor: 'lightsalmon',
      ratio: 28.346 // 1px to 1cm
    };


    // Input Validation in Constructor:
    this._validateTarget(_target, _source, _margin);
    this._validateSource(_source);
    this._validateMargin(_margin, _source, _target);

    if (this._margin && (!this._margin.width && !this._margin.height)) {
      this._margin = {
        width: 0,
        height: 0
      };
    }
  }
  /**
   * @beta Renamed to `input` from `sizing`.
   * @readonly
   * 
   * Read the sizing input if needed;
   * @remarks it can be useful if you want to reuse or do something with the input in the process 
   * @type {ILayoutInput}
   * @example
   * ```ts
   * 
   *  const calculator = new CalculatorLayoutClass(A, B, C);
   *  
   *  // if you need the input size          
   *  const input = calculator.input;
   *  console.log(`The Input Size :`, input);
   *  
   *  // eq. output in the console:
   *  input: {
   *    "source":{ "width":65, "height":100 },
   *    "target":{ "width":23, "height":12 },
   *    "margin":{ "width":1, "height":1 }
   *  }
   * 
   * ```
   * @see
   * - `interface` {@link ILayoutInput ILayoutInput}.
   */
  get input(): ILayoutInput {
    return {
      source: this._source,
      target: this._target,
      margin: this._margin
    }
  }


  /**
   *
   * @property {ILayoutConfig} config - Gets the current layout configuration.
   */
  get config(): ILayoutConfig {
    return this._config;
  }

  /** 
   * @public
   * @property {ILayoutConfig} config - Sets the layout configuration, with validation.
   *
   * @defaultValue 
   * fonts = { size: 3, family: 'sans-serif', unit: 'px' },
   * textColor = 'rgb(85, 85, 85)',
   * lineWidth =  0.18,
   * strokeColor = 'rgb(85, 85, 85)',
   * paperColor = 'rgb(233, 229, 229)',
   * mainOuterColor = 'skyblue',
   * mainInnerColor = 'lightgreen',
   * remainOuterColor = 'lightsalmon',
   * remainInnerColor = 'lightcoral',
   * ratio = 28.346 // 1px to 1cm
   * 
   * @throws {Error} 
   * - Throws an **`error`** if the **`lineWidth`** is not **`positive number (< 0)`** or if any of the color values are invalid.
   * - Throws an **`error`** if the **`paperColor`**, **`mainInnerColor`**, **`mainOuterColor`**, **`remainInnerColor`**, **`remainOuterColor`** 
   *   values are **`invalid`**.
   * @see 
   * + Configuration {@link ILayoutConfig interface}
   * + [Valid CSS Color](https://www.w3.org/wiki/CSS/Properties/color/keywords). 
   */
  public set config(config: ILayoutConfig) {

    this._validateConfig(config);

    /* iterate through config and assign defined keys provided to this._config */
    Object.keys(config).forEach((key) => {
      if (key in this._config) {
        // Use type assertion to tell TypeScript that key is a valid key of ILayoutConfig
        this._config[key as keyof ILayoutConfig] = config[key as keyof ILayoutConfig] as never;

        // console.log(`${key} :`, this._config[key as keyof ILayoutConfig]);
      }
    });
  }

  /**
   *
   * 
   * Calculates the positions and dimensions of inner and outer rectangles within a grid matrix.
   * @param {IRectMatrixResult[][]} rectMatrixArray - The matrix representing the grid.
   * @param {IPaperLayoutSizing} sizing - The sizing information for outer, inner, and margin sizes.
   * @param {boolean} [reverse=false] - Flag to reverse the width and height if needed.
   * @param {{ x: number; y: number }} [start] - The starting position for calculating rectangles.
   * @returns {IRectMatrixResult[]} An array of IRectMatrixResult, each representing a rectangle.
   * @throws {Error} Throws an error if the rectMatrixArray is empty or undefined or not an array.
   */
  private _buildRectMatrix(
    rectMatrixArray: IRectMatrixResult[][],
    sizing: IPaperLayoutSizing,
    reverse?: boolean,
    start?: ILayoutCoords): IRectMatrixResult[] {

    const results: IRectMatrixResult[] = [];

    // console.log('Matrix Array : ', matrixArray);
    // console.log('Sizing : ', sizing);
    // console.log('Reverse : ', reverse);
    // console.log('Start : ', start);

    this._validateRectMatrixArray(rectMatrixArray);

    const outerSize = {
      width: (reverse ? sizing.outerSize.height : sizing.outerSize.width),
      height: (reverse ? sizing.outerSize.width : sizing.outerSize.height)
    };

    const innerSize = {
      width: (reverse ? sizing.innerSize.height : sizing.innerSize.width),
      height: (reverse ? sizing.innerSize.width : sizing.innerSize.height)
    };

    const marginSize = {
      width: (reverse ? sizing.marginSize.height : sizing.marginSize.width),
      height: (reverse ? sizing.marginSize.width : sizing.marginSize.height)
    };

    for (let r = 0; r < rectMatrixArray.length; r++) {
      for (let c = 0; c < rectMatrixArray[r].length; c++) {

        let grid = rectMatrixArray[r][c]['grid'];
        grid = {
          row: r,
          column: c
        };

        let outer = rectMatrixArray[r][c]['outer'];
        outer = {
          x: (start ? start.x : 0) + c * outerSize.width, // plus start
          y: (start ? start.y : 0) + r * outerSize.height, // plus start
          width: outerSize.width,
          height: outerSize.height
        };

        let inner = rectMatrixArray[r][c]['inner'];
        inner = {
          x: (outer.x as number + marginSize.width),
          y: (outer.y as number + marginSize.height),
          width: innerSize.width,
          height: innerSize.height
        };

        results.push({ inner, outer, grid });
      }
    }
    return results;
  }

  /**
   *
   * 
   * Calculates the remaining space on the source after placing the main grid of targets.
   * It checks if the remaining space is enough to place more targets.
   * @param {ISquareSize} source - The size of the source rectangle.
   * @param {ISquareSize} container - The size of the container for the main grid.
   * @param {ISquareSize} target - The size of the target rectangle.
   * @param {ISquareSize} margin - The margin around the target rectangles.
   * @returns {{ grid: IMatrixGrid, start: ILayoutCoords } | null} The grid and start position of the remaining part, or null if no space is left.
   * @throws {Error} Throws an error if a negative `remainX` or `remainY` is calculated.
   */
  private _calculateRemain(
    source: ISquareSize,
    container: ISquareSize,
    target: ISquareSize,
    margin: ISquareSize): { grid: IMatrixGrid, start: ILayoutCoords } | null {


    let grid: IMatrixGrid,
      start: ILayoutCoords,
      result: { grid: IMatrixGrid, start: ILayoutCoords; } | null;

    const remainX = source.width - container.width;
    const remainContainerX = { width: remainX, height: source.height };
    const remainY = source.height - container.height;
    const remainContainerY = { width: source.width, height: remainY };

    this._validateRemainXY(remainX, remainY);

    const condition1 = remainY >= target.width;
    const condition2 = remainX >= target.height;

    if (condition2) {
      // console.log('match with condition 2', condition2);
      grid = this._crossCut(remainContainerX, target, margin);
      start = { x: container.width, y: 0 };
      result = { grid, start };
    } else if (condition1) {
      // console.log('match with condition 1', condition1);
      grid = this._crossCut(remainContainerY, target, margin);
      start = { x: 0, y: container.height };
      result = { grid, start };
    } else {
      result = null;
    }

    return result;
  }

  /**
   *
   * 
   * Calculates the number of rows and columns of targets that can fit in the source using the inline method (same orientation).
   * @param {ISquareSize} source - The size of the source rectangle.
   * @param {ISquareSize} target - The size of the target rectangle.
   * @param {ISquareSize} margin - The margin around the target rectangles.
   * @returns {IMatrixGrid} The number of rows and columns that can fit.
   * @throws {Error} Throws an error if a division by zero would occur.
   */
  private _inlineCut(source: ISquareSize, target: ISquareSize, margin: ISquareSize): IMatrixGrid {

    this._validateDivisionByZero(target.width + (2 * margin.width));
    this._validateDivisionByZero(target.height + (2 * margin.height));

    const input = {
      width: target.width + (2 * margin.width),
      height: target.height + (2 * margin.height)
    };

    const remainX = source.width % input.width;
    const remainY = source.height % input.height;

    const column = (source.width - remainX) / input.width;
    const row = (source.height - remainY) / input.height;
    const grid = { row, column };

    return grid;
  }

  /**
    * 
    * 
    * Calculates the number of rows and columns of targets that can fit in the source using the cross method (different orientation).
    * In this method, the target's width is aligned with the source's height, and the target's height is aligned with the source's width.
    * @param {ISquareSize} source - The size of the source rectangle.
    * @param {ISquareSize} target - The size of the target rectangle.
    * @param {ISquareSize} margin - The margin around the target rectangles.
    * @returns {IMatrixGrid} The number of rows and columns that can fit in the grid.
    *                         The `row` property represents the number of rows, and the `column` property represents the number of columns.
    * @throws {Error} Throws an error if a division by zero would occur due to zero or negative dimensions.
    */
  private _crossCut(
    source: ISquareSize,
    target: ISquareSize,
    margin: ISquareSize): IMatrixGrid {

    this._validateDivisionByZero(target.width + (2 * margin.width));
    this._validateDivisionByZero(target.height + (2 * margin.height));

    const input = {
      width: target.width + (2 * margin.width),
      height: target.height + (2 * margin.height)
    };

    const remainX = source.width % input.height;
    const remainY = source.height % input.width;

    const column = (source.width - remainX) / input.height;
    const row = (source.height - remainY) / input.width;
    const grid = { row, column };

    return grid;
  }

  /**
   *
   * 
   * Generates the layout of rectangles based on the calculated grid and sizing information.
   * It calculates the positions and dimensions of the main grid and the remaining rectangles.
   * @param {IMatrixGrid} grid - The grid information (rows, columns) for the main layout.
   * @param {IPaperLayoutSizing} sizing - The sizing information for source, outer, inner, and margin sizes.
   * @returns {{ ILayoutResult }} An object containing the main and optional remaining rectangles.
   * @throws {Error} Throws an error if the number of rows or columns in the grid is zero or negative.
   */
  private _generateLayoutMatrix(grid: IMatrixGrid, sizing: IPaperLayoutSizing): ILayoutResult {
    let remain: IRectMatrixResult[] | undefined, main;
    // console.log('sizing: ', sizing);
    this._validateGrid(grid);

    const mainMatrix = Array(grid.row).fill(Array(grid.column).fill({ inner: {}, outer: {}, grid: {} }));
    main = this._buildRectMatrix(mainMatrix, sizing);
    const mainContainer = {
      x: 0,
      y: 0,
      width: sizing.outerSize.width * grid.column,
      height: sizing.outerSize.height * grid.row
    };

    const remainer = this._calculateRemain(sizing.source, mainContainer, sizing.innerSize, sizing.marginSize);

    if (remainer && remainer.grid && remainer.grid.row > 0 && remainer.grid.column > 0) {
      const remainMatrix = Array(remainer.grid.row).fill(Array(remainer.grid.column).fill({ inner: {}, outer: {}, grid: {} }));
      remain = this._buildRectMatrix(remainMatrix, sizing, true, remainer.start);
      return { main, remain: remain ?? [] };
    } else {
      return { main };
    }
  }

  /**
   * @public
   * 
   * Calculates the layout of rectangles based on the source, target, and margin sizes.
   * It determines the optimal arrangement of target rectangles within the source rectangle,
   * considering the specified margin and whether to use inline or cross-cutting methods.
   * @returns {{ main: IRectMatrixResult[]; remain?: IRectMatrixResult[]; total: number }} An object containing the main and optional remaining rectangles, along with the total number of rectangles.
   * @throws {Error} Throws an `error` if the number of rows or columns in the grid is zero or negative.
   *
   * @example
   * ```ts
   * 
   *  // class declaration
   *  const calculator = new CalculatorLayoutClass(A, B, C);
   *  // run the method         
   *  result = calculator.calculate(); 
   *  // calculation results
   *  console.log(`Calculation result :`, result);
   * 
   *  ```
   *  @see
   *  - Output {@link ILayoutResult Interface}.
   */
  public calculate(): ILayoutResult & { total: number; } {

    // console.log('from Calculate() method');
    let results, grid: IMatrixGrid, layout: ILayoutResult;
    let total = 0;

    const innerSize = {
      width: this._useInline ? this._target.width : this._target.height,
      height: this._useInline ? this._target.height : this._target.width
    };

    const outerSize = {
      width: this._useInline ? this._target.width + (2 * this._margin.width) : this._target.height + (2 * this._margin?.height),
      height: this._useInline ? this._target.height + (2 * this._margin.height) : this._target.width + (2 * this._margin?.width)
    };

    const marginSize = {
      width: this._useInline ? this._margin?.width : this._margin?.height,
      height: this._useInline ? this._margin?.height : this._margin?.width
    };

    if (this._useInline) {
      grid = this._inlineCut(this._source, this._target, this._margin);
    } else {
      grid = this._crossCut(this._source, this._target, this._margin);
    }

    this._validateGrid(grid);


    const sizing = { source: this._source, outerSize, innerSize, marginSize };
    layout = this._generateLayoutMatrix(grid, sizing);

    Object.keys(layout).forEach(key => {
      if (key in layout) {
        total += layout[key].length;
      }
    });

    results = Object.assign({}, layout, { total });
    // console.log(`Results :`, results);
    return results;
  }

  /**
   * @public
   * 
   * Draws the calculated layout on the canvas and returns `HTMLCanvasElement` data.
   * @remarks
   * - It first calculates the layout, then draws the main and remaining rectangles,
   * - and finally returns the Canvas drawing data as either a base64 encoded string or a raw Canvas string.
   * 
   * *`note`: When generating layouts as a `<canvas/>`, please note that canvas elements are pixel-based. 
   * This means that the canvas will need to be __resized exponentially__ to achieve the actual size `(1px x 28,346 = 1cm)`. 
   * which can impact rendering and generating performance and will produce bigger file sizes.
   * Make sure the {@link _source __canvas size__} and {@link config __ratio__} you use are optimized for performance and provide the best possible user experience.*
   * 
   * @param {boolean} [resourceURL=true] 
   * + If `true`, returns is a base64 encoded data URL.
   * + If `false`, returns the raw Canvas string. Defaults to `true`.
   * @defaultValue 
   * >*resourceURL*: `boolean` =  `true`
   * @returns {string | HTMLCanvasElement} The data as either a base64 encoded data URL or a raw `HTMLCanvasElement` string.
   * @throws Throws an `error` if there is an issue during the drawing process.
   * @example
   * + Class Declaration
   * ```ts
   * 
   *  // class declaration
   *  const calculator = new CalculatorLayoutClass(A, B, C);
   *  // calculate layout. 
   *  const result = calculator.calculate(); 
   * 
   * ```
   * + `drawing` output as **`base64 .jpeg`**
   * ```ts
   * 
   *  // draw layout
   *  const layout = calculator.drawCanvas(); // ** this will return base64Image **
   *  // base64 .jpeg result
   *  console.log(`image url :`, layout);
   *  
   * ```
   * + `drawing` output as **`<canvas/>`** element
   * ```ts
   * 
   *  // ** If you need to returned `<canvas/>` element, set `param` to `false` **
   *  const canvasElement: HTMLCanvasElement = calculator.drawCanvas(false);
   *  
   *  console.log(`canvas :`, canvasElement);
   *  
   *  ```
   * *`note`: You can skip `calculate()` method if you want, drawing will automatically calculating the layout to plot the rects in.
   */
  public drawCanvas(resourceURL: boolean = true): string | HTMLCanvasElement {
    /** Variable Declaration **/
    const ratio = this.config.ratio as number;
    const width = this._source.width * ratio;
    const height = this._source.height * ratio;
    const lineWidth = this.config.lineWidth as number * ratio;
    const mainOuterColor = this.config.mainOuterColor as string;
    const mainInnerColor = this.config.mainInnerColor as string;
    const remainOuterColor = this.config.remainOuterColor as string;
    const remainInnerColor = this.config.remainInnerColor as string;
    const paperColor = this.config.paperColor as string;
    const strokeColor = this.config.strokeColor as string;

    /** Alert a warning message due too high ratio **/
    if (ratio > 28.346) {
      const msg = `Generated Layout has exceeded the actual size (px to cm).\nImage rendering performance will be impacted\ndue to high Ratio ( >28,346 ).`
      alert(msg);
    }

    /** initialize canvas drawing by first creating paper using size of the source **/
    this._Element = document.createElement('canvas') as HTMLCanvasElement;
    const canvas = this._Element;
    canvas.setAttribute('id', 'calculation-layout');
    canvas.width = width;
    canvas.height = height;

    /** creating canvas context **/
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    /* Draw Paper rect */
    context.lineWidth = lineWidth as number;
    context.fillStyle = paperColor;
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fill();
    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.stroke();
    context.save();

    try {

      const calculation = this.calculate();
      const mainRects = calculation.main;
      const remainRects = calculation.remain;

      /**  Draw Layout for Main Plot **/
      this._plottingCanvasRectLayout(context, mainRects, 0, mainOuterColor, mainInnerColor);
      if (remainRects) {
        /** Draw Layout for Remain Plot **/
        this._plottingCanvasRectLayout(context, remainRects, mainRects.length, remainOuterColor, remainInnerColor);
      }

      context.restore();
      // console.log('Context 2D: ', this.ctx);
      if (resourceURL) {
        // return `base64 Image`
        const base64image = canvas.toDataURL('image/jpeg', 1.0);
        return base64image;
      } else {
        // return `HtmlCanvasElement`
        return canvas;
      }

    } catch (error) {
      throw new Error(`Error in drawing process ${error}`);
    }


  }

  /**
   *
   * 
   * Plots the rectangles in the layout on the canvas.
   * @remarks
   * - It first draws the outer rectangles if the margin is greater than 0, and then draws the inner rectangles.
   * - It also draws the stroke and fills the rectangles with the specified colors.
   * - Finally, it draws the text on the inner rectangles using the specified font and text color.
   * @param {CanvasRenderingContext2D} context - The 2D rendering context for drawing on the canvas.
   * @param {IRectMatrixResult[]} rectangles - An array of IRectMatrixResult, each representing a rectangle.
   * @param {number} startIndex - The starting index for drawing the text on the inner rectangles.
   * @param {string} outerColor - The color for drawing the outer rectangles.
   * @param {string} innerColor - The color for drawing the inner rectangles.
   */
  private _plottingCanvasRectLayout(
    context: CanvasRenderingContext2D,
    rectangles: IRectMatrixResult[],
    startIndex: number,
    outerColor: string,
    innerColor: string): void {
    /** Variable declarations **/
    const ratio = this.config.ratio as number;
    const marginWidth = this._margin.width * ratio;
    const marginHeight = this._margin.height * ratio;
    const strokeColor = this.config.strokeColor as string;
    const lineWidth = this.config.lineWidth as number * ratio;
    const textColor = this.config.textColor as string;
    // const fonts = `${this.config.fonts?.size as number * ratio}${this.config.fonts?.unit} ${this.config.fonts?.family}`;

    if (rectangles) {

      /** if margin is greater than 0 `draw outer rectangle` first **/
      if (marginHeight > 0 && marginWidth > 0) {
        for (let i = 0; i < rectangles.length; i++) {

          const outerRect = rectangles[i].outer;
          const outerRectWidth = outerRect.width * ratio;
          const outerRectHeight = outerRect.height * ratio;
          const outerRectX = outerRect.x as number * ratio;
          const outerRectY = outerRect.y as number * ratio;

          context.fillStyle = outerColor;
          context.beginPath();
          context.rect(outerRectX, outerRectY, outerRectWidth, outerRectHeight);
          context.fill();
          context.strokeStyle = strokeColor;
          context.lineWidth = lineWidth;
          context.stroke();
          context.save();

        }
      }
      /** Draw inner rectangle **/
      for (let i = 0; i < rectangles.length; i++) {

        const innerRect = rectangles[i].inner;
        const innerRectWidth = innerRect.width * ratio;
        const innerRectHeight = innerRect.height * ratio;
        const innerRectX = innerRect.x as number * ratio;
        const innerRectY = innerRect.y as number * ratio;

        const fontSize = this._calculateFontSize(innerRectWidth, innerRectHeight, true);
        const fonts = `${fontSize}${this.config.fonts?.unit} ${this.config.fonts?.family}`;

        const textCoordinateX = (innerRectX + (innerRectWidth / 2));
        const textCoordinateY = (innerRectY + (innerRectHeight / 2));

        context.fillStyle = innerColor;
        context.beginPath();
        context.rect(innerRectX, innerRectY, innerRectWidth, innerRectHeight);
        context.fill();

        /** `Draw Outline Stroke` on Inner Rect only if margin = 0 **/
        if (marginHeight === 0 && marginWidth === 0) {
          context.lineWidth = lineWidth;
          context.strokeStyle = strokeColor;
          context.stroke();
        }

        /** `Draw Text` on the middle of inner rect **/
        context.font = fonts;
        console.log(`ctx font`, context.font)
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = textColor;

        context.fillText(`${startIndex + i + 1}`, textCoordinateX, textCoordinateY);
        context.save();
      }
    }
  }

  /**
  * @public
  * 
  * Draws the calculated layout on an SVG document and returns the SVG data.
  * @remarks
  * - It first calculates the layout, then draws the main and remaining rectangles,
  * - and finally returns the SVG data as either a base64 encoded data URL or a raw SVG string.
  * 
  * ***`*note`**: although **`<svg/>`** can work using **`cm`** unit, but it is set based on `pixel` unit with *{@link config ratio multiplier}* to achieve the same result. 
  * because cm unit will cause clipping **`issue`** when viewing in browser for unknown reason.*
  * 
  * @param {boolean} [resourceURL=true] 
  * + If `true`, returns the SVG as a base64 encoded data URL.
  * + If `false`, returns the raw SVG string. Defaults to `true`.
  * @defaultValue 
  * >*resourceURL*: `boolean` =  `true`
  * @returns {string | SVGSVGElement} The SVG data as either a base64 encoded data URL or a raw SVG string.
  * @throws Throws an error if there is an issue during the drawing process.
  * @example
  * + Class Declaration
  * ```ts
  * 
  *  // class declaration
  *  const calculator = new CalculatorLayoutClass(A, B, C);
  *  // calculate layout. 
  *  const result = calculator.calculate(); 
  * 
  * ```
  * + `drawing` output as **`base64 .svg`**
  * ```ts
  * 
  *  // draw layout
  *  const layout = calculator.drawSvg(); // ** this will return base64Image **
  *  // base64 .svg result
  *  console.log(`base64 svg url :`, layout);
  *  
  * ```
  * + `drawing` output as **`<svg/>`** element
  * ```ts
  * 
  *  // ** If you need to returned `<svg/>` element, set `param` to `false` **
  *  const svgElement: SVGSVGElement = calculator.drawSvg(false);
  *  
  *  console.log(`svg :`, svgElement);
  *  
  *  ```
  * *`note`: You can skip `calculate()` method if you want, drawing will automatically calculating the layout to plot the rects in.
  * 
  */
  public drawSvg(resourceURL: boolean = true): string | SVGSVGElement {

    /** Variable Declaration **/
    const width = this._source.width;
    const height = this._source.height;
    const paperColor = this.config.paperColor as string;
    const mainInnerColor = this.config.mainInnerColor as string;
    const mainOuterColor = this.config.mainOuterColor as string;
    const remainInnerColor = this.config.remainInnerColor as string;
    const remainOuterColor = this.config.remainOuterColor as string;
    const strokeColor = this.config.strokeColor as string;
    const lineWidth = `${this.config.lineWidth as number * 3.5}pt`; // to return 1 point
    // const unit = 'cm'; /** Causing clipping in webview **/
    const ratio = this.config.ratio as number; /** ratio px to cm **/


    /** Initialize svg document **/
    this._Element = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    const svgElement = this._Element;
    svgElement.setAttribute('version', '1.1');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    svgElement.setAttribute('xml:space', 'preserve');
    svgElement.setAttribute('viewBox', `0 0 ${width * ratio} ${height * ratio}`);
    svgElement.setAttribute('preserveAspectRatio', `xMidYMid meet`);
    svgElement.setAttribute('width', `${width * ratio}`);
    svgElement.setAttribute('height', `${height * ratio}`);
    svgElement.setAttribute('id', 'calculation-layout');

    /** Create Groups **/
    const mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    mainGroup.setAttribute('id', 'layout');

    /** by first `creating paper` using size of the source **/
    const svgPaperRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    mainGroup.setAttribute('id', 'paper');
    svgPaperRect.setAttribute('x', `0`);
    svgPaperRect.setAttribute('y', `0`);
    svgPaperRect.setAttribute('width', `${width * ratio}`);
    svgPaperRect.setAttribute('height', `${height * ratio}`);
    svgPaperRect.setAttribute('fill', `${paperColor}`);
    svgPaperRect.setAttribute('anchor', 'middle');
    svgPaperRect.setAttribute('vector-effect', 'non-scaling-stroke'); /** add this for prevent scaling stroke width **/
    svgPaperRect.setAttribute('stroke', strokeColor);
    svgPaperRect.setAttribute('stroke-width', String(lineWidth));
    svgPaperRect.setAttribute('vector-effect', 'non-scaling-stroke');
    /* Add paperto the group */
    mainGroup.appendChild(svgPaperRect);

    try {

      const calculation = this.calculate();
      const mainRects = calculation.main;
      const remainRects = calculation.remain;

      /**  Append groups to SVG before plotting **/
      svgElement.appendChild(mainGroup);
      if (remainRects) {
        svgElement.appendChild(mainGroup);
      }

      /** Draw Layout with Group **/
      this._plottingSvgRectLayout(mainGroup as SVGSVGElement, mainRects, 0, mainOuterColor, mainInnerColor);
      if (remainRects) {
        this._plottingSvgRectLayout(mainGroup as SVGSVGElement, remainRects, mainRects.length, remainOuterColor, remainInnerColor);
      }

      // console.log('SVG Element', svgElement);
      if (resourceURL) {
        const serializedSvg = new XMLSerializer().serializeToString(svgElement);
        const base64svg = `data:image/svg+xml;charset=utf-8, ${serializedSvg}`;
        return base64svg;
      } else {
        return svgElement;
      }

    } catch (error) {
      throw new Error(`Error in drawing process ${error}`);
    }
  }

  /**
   *
   * Draws the rectangles on an SVG document. 
   * - It first draws the outer rectangle, 
   * - then the inner rectangle, 
   * - and finally the text in the middle of the inner rectangle.
   * @param {SVGSVGElement} svgElement - The SVG element to draw on.
   * @param {IRectMatrixResult[]} rectangles - The array of rectangles to draw.
   * @param {number} startIndex - The starting index for numbering the rectangles.
   * @param {string} outerColor - The color for the outer rectangle.
   * @param {string} innerColor - The color for the inner rectangle.
   * @returns {SVGSVGElement} The SVG element with the rectangles drawn.
   */
  private _plottingSvgRectLayout(
    svgElement: SVGSVGElement,
    rectangles: IRectMatrixResult[],
    startIndex: number,
    outerColor: string,
    innerColor: string): SVGSVGElement {

    // console.log('Rectangles :', rectangles)

    const strokeColor = this.config.strokeColor as string;
    const lineWidth = `${this.config.lineWidth as number * 4}pt`; // to return 1 point
    const textColor = this.config.textColor as string;

    const fontFamily = this.config.fonts?.family;
    // const unit = 'cm'; // switch `unit` to `ratio` to fix webview clipping issue
    const ratio = this.config.ratio as number; // ** Ratio px to cm **


    for (let i = 0; i < rectangles.length; i++) {
      const outerRect = rectangles[i].outer;
      const outerRectWidth = outerRect.width * ratio;
      const outerRectHeight = outerRect.height * ratio;
      const outerRectX = outerRect.x as number * ratio;
      const outerRectY = outerRect.y as number * ratio;

      const innerRect = rectangles[i].inner;
      const innerRectWidth = innerRect.width * ratio;
      const innerRectHeight = innerRect.height * ratio;
      const innerRectX = innerRect.x as number * ratio;
      const innerRectY = innerRect.y as number * ratio;

      const fontSize = this._calculateFontSize(innerRectWidth, innerRectHeight);
      console.log('svg fontsize:', fontSize);
      const textCoordinateX = (innerRectX + (innerRectWidth / 2));
      const textCoordinateY = (innerRectY + (innerRectHeight / 2));

      /** Draw SVG Outer Rectangles **/
      const svgOuterRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svgOuterRect.setAttribute('x', `${outerRectX}`);
      svgOuterRect.setAttribute('y', `${outerRectY}`);
      svgOuterRect.setAttribute('width', `${outerRectWidth}`);
      svgOuterRect.setAttribute('height', `${outerRectHeight}`);
      svgOuterRect.setAttribute('fill', outerColor);
      svgOuterRect.setAttribute('stroke', strokeColor);
      svgOuterRect.setAttribute('stroke-width', String(lineWidth));
      svgOuterRect.setAttribute('vector-effect', 'non-scaling-stroke');

      /** Draw SVG Inner Rectangles **/
      const svgInnerRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svgInnerRect.setAttribute('x', `${innerRectX}`);
      svgInnerRect.setAttribute('y', `${innerRectY}`);
      svgInnerRect.setAttribute('width', `${innerRectWidth}`);
      svgInnerRect.setAttribute('height', `${innerRectHeight}`);
      svgInnerRect.setAttribute('fill', innerColor);
      svgInnerRect.setAttribute('vector-effect', 'non-scaling-stroke');

      /** Draw SVG Text in the middle of inner rect **/
      const svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      svgText.setAttribute('x', `${textCoordinateX}`);
      svgText.setAttribute('y', `${textCoordinateY}`); // 10 is adjustment hack for centering `text`.
      svgText.setAttribute('text-anchor', 'middle');
      svgText.setAttribute('font-size', `${fontSize * ratio}`);
      svgText.setAttribute('font-family', `${fontFamily}`);
      svgText.setAttribute('fill', `${textColor}`);
      svgText.textContent = `${startIndex + i + 1}`;
      // ADD this for fixing text position
      svgText.setAttribute('dominant-baseline', 'middle');

      /** Create a Group for each Rectangle Set (Outer, Inner, Text) **/
      const rectGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      rectGroup.setAttribute('id', `cutting-block-${startIndex + i + 1}`);

      /* Add `Outer Rect` to the group */
      rectGroup.appendChild(svgOuterRect);

      /* Add `Inner Rect` to the group */
      rectGroup.appendChild(svgInnerRect);

      /* Add `Text` to the group */
      rectGroup.appendChild(svgText);

      /* Add the Group to the passed `svgElement` */
      svgElement.appendChild(rectGroup);
    }

    return svgElement;
  }

  /**
   * @public
   * 
   * Resets the canvas element and its 2D context to their initial states.
   * @remarks
   * This method is useful when you want to clear the canvas and start over.
   * It removes the canvas element from the DOM, resets the 2D context,
   * and clears the console.
   * * @example
   * + `drawing`
  * ```ts
  * 
  *  // class declaration
  *  const calculator = new CalculatorLayoutClass(A, B, C);
  * 
  *  // draw layout to returned `<svg/>` element
  *  const svgElement: SVGSVGElement = calculator.drawSvg(false);
  *  console.log(`svg :`, svgElement);
  * 
  * ```
  * + **`reset calculator`** a `null` is expected.
  * ```ts
  * 
  *  calculator.reset();
  *  console.log(`svg :`, svgElement); // will be `null`.
  *  
  *  ```
  * 
  */
  public reset() {
    if (this._Element) {
      /** Nulling the Element to guarantee it's been removed from the DOM **/
      this._Element = null;
    }
    // console.log(`Element successfuly removed from the DOM!`, this._Element);
  }


  /**
   * Calculates a dynamic font size based on the available space of the given rectangle.
   * @param {number} innerRectWidth  The width of the inner rectangle.
   * @param {number} innerRectHeight  The height of the inner rectangle.
   * @param {boolean} [useRatio = true] If true, the font size is multiplied by the given ratio.
   * @returns {number} The calculated dynamic font size.
   * @remarks
   * The calculation is based on the following steps:
   * 1. Take the smaller dimension of the given rectangle as the available space.
   * 2. Subtract 10% of the available space as padding on each side.
   * 3. Calculate the dynamic font size as half of the usable space.
   * 4. Clamp the dynamic font size between the given min and max font sizes.
   * + If `useRatio` is `true`, the font size is multiplied by the given `ratio`.
   */
  private _calculateFontSize(innerRectWidth: number, innerRectHeight: number, useRatio: boolean = false): number {
    const ratio = this.config.ratio as number;
    const minFontSize = this.config.fonts?.size as number;
    const maxFontSize = this.config.fonts?.size as number * 1.5;

    /** Calculate Dynamic Font Size **/
    // 1. Available space, take the smaller dimension of the rect
    const availableSpace = Math.min(innerRectWidth, innerRectHeight);

    // 2. Padding - 10% of the available space on each side (adjust as needed)
    const padding = availableSpace * 0.1;
    const usableSpace = availableSpace - (padding * 2);

    // 3. Dynamic font size
    let dynamicFontSize = usableSpace / 2;

    // 4. clamp
    dynamicFontSize = Math.max(minFontSize, Math.min(maxFontSize, dynamicFontSize));

    return useRatio ? (dynamicFontSize * ratio) : dynamicFontSize;
  }
  /* VALIDATION METHOD FOR BETTER READABILITY ERROR HANDLING */

  /**
   *
   * 
   * Checks if a given string is a valid CSS color.
   * @param color - The color string to validate.
   * @returns boolean - True if the color is valid, false otherwise.
   */
  private _isValidColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }

  /**
   *
   * 
   * Validates the source size.
   * @param {ISquareSize} source - The source size to validate.
   * @throws {Error} Throws an error if the source dimensions are invalid.
   */
  private _validateSource(source: ISquareSize): void {
    if (isNaN(source.width) || isNaN(source.height)) {
      throw new Error("Please provide source width and height.");
    }
    if (source.width <= 0 || source.height <= 0) {
      throw new Error("Source width and height must be positive values.");
    }
  }

  /**
   *
   * 
   * Validates the target size.
   * @param {ISquareSize} target - The target size to validate.
   * @param {ISquareSize} source - The source size to use for validation.
   * @param {ISquareSize} margin - The margin size to validate.
   * @throws {Error} Throws an error if the target dimensions are invalid.
   */
  private _validateTarget(target: ISquareSize, source: ISquareSize, margin: ISquareSize): void {
    if (!source && !target) {
      throw new Error("Please provide source and target size.");
    }
    if (isNaN(source.width) || isNaN(source.height) || isNaN(target.width) || isNaN(target.height)) {
      throw new Error("Incorrect input value! The input must contain a number greater than 0.");
    }
    if (target.width <= 0 || target.height <= 0) {
      throw new Error("Target width and height must be positive values.");
    }
    // Check if target size is larger than source size with margin
    if ((target.width + (2 * margin.width) > source.width) || (target.height + (2 * margin.height) > source.height)) {
      throw new Error("Target size is too large for the source with margin.");
    }
  }
  /**
   *
   * 
   * Validates the margin size.
   * @param {ISquareSize} margin - The margin size to validate.
   * @param {ISquareSize} source - The source size to use for validation.
   * @param {ISquareSize} target - The target size to use for validation.
   * @throws {Error} Throws an error if the margin dimensions are invalid.
   */
  private _validateMargin(margin: ISquareSize, source: ISquareSize, target: ISquareSize): void {
    if (margin.width < 0 || margin.height < 0) {
      throw new Error("Margin width and height must be non-negative values.");
    }
    if ((target.width + (2 * margin.width) > source.width) || (target.height + (2 * margin.height) > source.height)) {
      throw new Error("Margin values are too large");
    }
  }

  /**
   *
   * 
   * Validates the configuration object.
   * @param {ILayoutConfig} config - The configuration object to validate.
   * @throws {Error} Throws an error if any configuration property is invalid.
   */
  private _validateConfig(config: ILayoutConfig): void {
    if (config.lineWidth && config.lineWidth <= 0) {
      throw new Error("lineWidth must be positive number");
    }
    if (config.paperColor && !this._isValidColor(config.paperColor)) {
      throw new Error("paperColor has invalid value");
    }
    if (config.strokeColor && !this._isValidColor(config.strokeColor)) {
      throw new Error("strokeColor has invalid value");
    }
    if (config.textColor && !this._isValidColor(config.textColor)) {
      throw new Error("textColor has invalid value");
    }
    if (config.mainOuterColor && !this._isValidColor(config.mainOuterColor)) {
      throw new Error("mainOuterColor has invalid value");
    }
    if (config.mainInnerColor && !this._isValidColor(config.mainInnerColor)) {
      throw new Error("mainInnerColor has invalid value");
    }
    if (config.remainOuterColor && !this._isValidColor(config.remainOuterColor)) {
      throw new Error("remainOuterColor has invalid value");
    }
    if (config.remainInnerColor && !this._isValidColor(config.remainInnerColor)) {
      throw new Error("remainInnerColor has invalid value");
    }
    if (isNaN(config.ratio as number)) {
      throw new Error("invalid value! ratio must be a number");
    }
    if (Number(config.ratio) > 28.346) {
      const msg = `Generated Layout has exceeded the actual size (px to cm).\nImage rendering performance will be impacted\ndue to high Ratio ( >28.346 ).`
      console.warn(msg);
    }
  }

  /**
   *
   * 
   * Validates the rect matrix array.
   * @param {IRectMatrixResult[][]} rectMatrixArray - The matrix array to validate.
   * @throws {Error} Throws an error if the matrixArray is empty or undefined or not an array.
   */
  private _validateRectMatrixArray(rectMatrixArray: IRectMatrixResult[][]): void {
    if (!rectMatrixArray || !Array.isArray(rectMatrixArray) || rectMatrixArray.length === 0) {
      throw new Error("rectMatrixArray is empty or undefined or not an array");
    }
    if (rectMatrixArray[0].length === 0) {
      throw new Error("rectMatrixArray is empty");
    }
  }

  /**
   *
   * 
   * Validates the grid object.
   * @param {IMatrixGrid} grid - The grid to validate.
   * @throws {Error} Throws an error if the grid row or column values are invalid.
   */
  private _validateGrid(grid: IMatrixGrid): void {
    if (grid.row <= 0) {
      throw new Error("the number of rows in grid cannot be zero or negative number");
    }
    if (grid.column <= 0) {
      throw new Error("the number of columns in grid cannot be zero or negative number");
    }
  }

  /**
   *
   * 
   * Checks if a division by zero is about to occur.
   * @param {number} dividend - The value to be divided.
   * @throws {Error} Throws an error if the division would result in a division by zero.
   */
  private _validateDivisionByZero(dividend: number): void {
    if (dividend === 0) {
      throw new Error('Division by zero');
    }
  }

  /**
   *
   * 
   * Checks if the remainX or remainY has negative value.
   * @param {number} remainX - The remainX value.
   * @param {number} remainY - The remainY value.
   * @throws {Error} Throws an error if a negative remainX or remainY is calculated.
   */
  private _validateRemainXY(remainX: number, remainY: number): void {
    if (remainX < 0) {
      throw new Error("there is a negative remainX");
    }
    if (remainY < 0) {
      throw new Error("there is a negative remainY");
    }
  }


}
