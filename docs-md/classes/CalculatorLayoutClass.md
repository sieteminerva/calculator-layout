[**Layout Calculator**](../README.md)

***

[Layout Calculator](../README.md) / CalculatorLayoutClass

# Class: CalculatorLayoutClass

**Version 1.0**

This class is designed to calculate and visualize the optimal layout for cutting **`smaller rectangles (targets)`** from a **`larger rectangle (source/paper)`**.
It supports various configurations for the layout, including `margins`, `colors`, and different `output formats` such as SVG and Canvas.

**The class provides methods to:**
- Calculate the optimal arrangement of target rectangles within the source rectangle.
- Draw the calculated layout on an **`<svg/>`** or **`<canvas/>`** element.
- Customize the appearance of the layout, including colors and margins.
- Generate the layout as a `base64` encoded **`.svg`** or **`.jpeg`** image.
- Reset the layout and clear the drawing area.

**Key features include:**
- **Layout Calculation:** Determines the most efficient way to cut target rectangles from the source, considering margins and different cutting methods (inline or cross).

- **Visualization:** Renders the calculated layout on an **`<svg/>`** or **`<canvas/>`** element, allowing for visual inspection and customization.

- **Customization:** Supports various configuration options, such as colors for the paper, margins, and target rectangles, as well as font settings for text labels.

- **Output Formats:** Can generate the layout as an **`<svg/>`** element, a `base64` encoded **`.svg`** image, a **`<canvas/>`** element, or a `base64` encoded **`.jpeg`** image.

- **Error Handling:** Includes comprehensive validation and `error` handling to ensure the integrity of the calculations and drawings.

- **Reset Functionality:** Provides a method to reset the layout and clear the drawing area, allowing for new calculations and visualizations.

 The class is intended for use in applications where efficient layout planning and visualization are required, such as in printing, packaging, or design software.

## Author

[YMGH](https://github.com/sieteminerva)

## Example

***[1]*** *`set` the **`param`** & **`config`**.* [see here](CalculatorLayoutClass.md#config)
```ts

// ** Class params **
const source = { width: 79, height: 109 };
const target = { width: 22, height: 32 };
const margin = { width: 2, height: 3 ;

// ** config **
const layoutConfig: ILayoutConfig = {

   paperColor: 'beige',
   mainInnerColor: 'lightgreen',
   mainOuterColor: 'skyblue',
   remainInnerColor: 'lightcoral',
   remainOuterColor: 'lightsalmon',

};

```
***[2]*** ***`run`** a calculation.* [see here](CalculatorLayoutClass.md#calculate)
 ```ts

const calculator = new CalculatorLayoutClass(source, target, margin);
// ** Assign the `configuration` **
calculator.config = layoutConfig;

// ** Run Calculation **
const result = calculator.calculate();
console.log(`result`, result.total);

```
***[3]*** *get **`drawing`** a layout.* [see here](CalculatorLayoutClass.md#drawcanvas) `&` [here](CalculatorLayoutClass.md#drawsvg)
```ts

// ** Drawing Layout as base64svg **
const svg = calculator.drawSvg();
console.log(`svg base64`,  svg);

```
***[4]*** ***`reset`** calculator* [see here](CalculatorLayoutClass.md#reset)
```ts

 calculator.reset();
 console.log(`svg :`, svgElement); // will be `null`.
 
 ```

## See

- How to `set` the [config](CalculatorLayoutClass.md#config).
- Available `interface` [ILayoutConfig](../interfaces/ILayoutConfig.md). 
- How to `perform` a calculation [method](CalculatorLayoutClass.md#calculate). 
- How to `get` an output as `.svg base64 encoded` or `<svg/> Element` [method](CalculatorLayoutClass.md#drawsvg).
- How to `get` an output as `.jpeg base64 encoded` or `<canvas/> Element` [method](CalculatorLayoutClass.md#drawcanvas).

## Constructors

### new CalculatorLayoutClass()

> **new CalculatorLayoutClass**(`_source`, `_target`, `_margin`, `_useInline`?): [`CalculatorLayoutClass`](CalculatorLayoutClass.md)

#### Parameters

##### \_source

[`ISquareSize`](../interfaces/ISquareSize.md)

##### \_target

[`ISquareSize`](../interfaces/ISquareSize.md)

##### \_margin

[`ISquareSize`](../interfaces/ISquareSize.md) = `...`

##### \_useInline?

`boolean` = `true`

Flag to determine the calculation method (true: inline, false: cross). Defaults to true.

#### Returns

[`CalculatorLayoutClass`](CalculatorLayoutClass.md)

#### Throws

Throws an error if source, target, or margin dimensions are invalid.

#### Default Value

```ts
_margin = { width: 0, height: 0 };
_useInline = true;
```

## Properties

### \_config

> `private` `readonly` **\_config**: [`ILayoutConfig`](../interfaces/ILayoutConfig.md)

#### See

- `set` the [config](CalculatorLayoutClass.md#config)
- Available `interface` [ILayoutConfig](../interfaces/ILayoutConfig.md).

***

### \_Element

> `private` **\_Element**: `null` \| `SVGSVGElement` \| `HTMLCanvasElement` = `null`

#### See

- Producing `.svg` base64 encoded or `<svg/> Element` [Method](CalculatorLayoutClass.md#drawsvg)
- Producing `.jpeg` base64 encoded or `<canvas/> Element` [Method](CalculatorLayoutClass.md#drawcanvas)

***

### \_margin

> `private` **\_margin**: [`ISquareSize`](../interfaces/ISquareSize.md)

***

### \_source

> `private` **\_source**: [`ISquareSize`](../interfaces/ISquareSize.md)

***

### \_target

> `private` **\_target**: [`ISquareSize`](../interfaces/ISquareSize.md)

***

### \_useInline

> `private` **\_useInline**: `boolean` = `true`

Flag to determine the calculation method (true: inline, false: cross). Defaults to true.

## Accessors

### config

#### Get Signature

> **get** **config**(): [`ILayoutConfig`](../interfaces/ILayoutConfig.md)

##### Returns

[`ILayoutConfig`](../interfaces/ILayoutConfig.md)

#### Set Signature

> **set** **config**(`config`): `void`

##### Default Value

```ts
fonts = { size: 3, family: 'sans-serif', unit: 'px' },
textColor = 'rgb(85, 85, 85)',
lineWidth =  0.18,
strokeColor = 'rgb(85, 85, 85)',
paperColor = 'rgb(233, 229, 229)',
mainOuterColor = 'skyblue',
mainInnerColor = 'lightgreen',
remainOuterColor = 'lightsalmon',
remainInnerColor = 'lightcoral',
ratio = 28.346 // 1px to 1cm
```

##### Throws

- Throws an **`error`** if the **`lineWidth`** is not **`positive number (< 0)`** or if any of the color values are invalid.
- Throws an **`error`** if the **`paperColor`**, **`mainInnerColor`**, **`mainOuterColor`**, **`remainInnerColor`**, **`remainOuterColor`** 
  values are **`invalid`**.

##### See

+ Configuration [interface](../interfaces/ILayoutConfig.md)
+ [Valid CSS Color](https://www.w3.org/wiki/CSS/Properties/color/keywords).

##### Parameters

###### config

[`ILayoutConfig`](../interfaces/ILayoutConfig.md)

Sets the layout configuration, with validation.

##### Returns

`void`

***

### input

#### Get Signature

> **get** **input**(): [`ILayoutInput`](../interfaces/ILayoutInput.md)

**`Beta`**

Renamed to `input` from `sizing`.

Read the sizing input if needed;

##### Remarks

it can be useful if you want to reuse or do something with the input in the process

##### Example

```ts

 const calculator = new CalculatorLayoutClass(A, B, C);
 
 // if you need the input size          
 const input = calculator.input;
 console.log(`The Input Size :`, input);
 
 // eq. output in the console:
 input: {
   "source":{ "width":65, "height":100 },
   "target":{ "width":23, "height":12 },
   "margin":{ "width":1, "height":1 }
 }

```

##### See

- `interface` [ILayoutInput](../interfaces/ILayoutInput.md).

##### Returns

[`ILayoutInput`](../interfaces/ILayoutInput.md)

## Methods

### \_buildRectMatrix()

> `private` **\_buildRectMatrix**(`rectMatrixArray`, `sizing`, `reverse`?, `start`?): [`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[]

Calculates the positions and dimensions of inner and outer rectangles within a grid matrix.

#### Parameters

##### rectMatrixArray

[`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[][]

The matrix representing the grid.

##### sizing

[`IPaperLayoutSizing`](../interfaces/IPaperLayoutSizing.md)

The sizing information for outer, inner, and margin sizes.

##### reverse?

`boolean`

Flag to reverse the width and height if needed.

##### start?

[`ILayoutCoords`](../interfaces/ILayoutCoords.md)

The starting position for calculating rectangles.

#### Returns

[`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[]

An array of IRectMatrixResult, each representing a rectangle.

#### Throws

Throws an error if the rectMatrixArray is empty or undefined or not an array.

***

### \_calculateFontSize()

> `private` **\_calculateFontSize**(`innerRectWidth`, `innerRectHeight`, `useRatio`?): `number`

Calculates a dynamic font size based on the available space of the given rectangle.

#### Parameters

##### innerRectWidth

`number`

The width of the inner rectangle.

##### innerRectHeight

`number`

The height of the inner rectangle.

##### useRatio?

`boolean` = `false`

If true, the font size is multiplied by the given ratio.

#### Returns

`number`

The calculated dynamic font size.

#### Remarks

The calculation is based on the following steps:
1. Take the smaller dimension of the given rectangle as the available space.
2. Subtract 10% of the available space as padding on each side.
3. Calculate the dynamic font size as half of the usable space.
4. Clamp the dynamic font size between the given min and max font sizes.
+ If `useRatio` is `true`, the font size is multiplied by the given `ratio`.

***

### \_calculateRemain()

> `private` **\_calculateRemain**(`source`, `container`, `target`, `margin`): `null` \| \{ `grid`: [`IMatrixGrid`](../interfaces/IMatrixGrid.md); `start`: [`ILayoutCoords`](../interfaces/ILayoutCoords.md); \}

Calculates the remaining space on the source after placing the main grid of targets.
It checks if the remaining space is enough to place more targets.

#### Parameters

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the source rectangle.

##### container

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the container for the main grid.

##### target

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the target rectangle.

##### margin

[`ISquareSize`](../interfaces/ISquareSize.md)

The margin around the target rectangles.

#### Returns

`null` \| \{ `grid`: [`IMatrixGrid`](../interfaces/IMatrixGrid.md); `start`: [`ILayoutCoords`](../interfaces/ILayoutCoords.md); \}

The grid and start position of the remaining part, or null if no space is left.

#### Throws

Throws an error if a negative `remainX` or `remainY` is calculated.

***

### \_crossCut()

> `private` **\_crossCut**(`source`, `target`, `margin`): [`IMatrixGrid`](../interfaces/IMatrixGrid.md)

Calculates the number of rows and columns of targets that can fit in the source using the cross method (different orientation).
In this method, the target's width is aligned with the source's height, and the target's height is aligned with the source's width.

#### Parameters

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the source rectangle.

##### target

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the target rectangle.

##### margin

[`ISquareSize`](../interfaces/ISquareSize.md)

The margin around the target rectangles.

#### Returns

[`IMatrixGrid`](../interfaces/IMatrixGrid.md)

The number of rows and columns that can fit in the grid.
                        The `row` property represents the number of rows, and the `column` property represents the number of columns.

#### Throws

Throws an error if a division by zero would occur due to zero or negative dimensions.

***

### \_generateLayoutMatrix()

> `private` **\_generateLayoutMatrix**(`grid`, `sizing`): [`ILayoutResult`](../interfaces/ILayoutResult.md)

Generates the layout of rectangles based on the calculated grid and sizing information.
It calculates the positions and dimensions of the main grid and the remaining rectangles.

#### Parameters

##### grid

[`IMatrixGrid`](../interfaces/IMatrixGrid.md)

The grid information (rows, columns) for the main layout.

##### sizing

[`IPaperLayoutSizing`](../interfaces/IPaperLayoutSizing.md)

The sizing information for source, outer, inner, and margin sizes.

#### Returns

[`ILayoutResult`](../interfaces/ILayoutResult.md)

An object containing the main and optional remaining rectangles.

#### Throws

Throws an error if the number of rows or columns in the grid is zero or negative.

***

### \_inlineCut()

> `private` **\_inlineCut**(`source`, `target`, `margin`): [`IMatrixGrid`](../interfaces/IMatrixGrid.md)

Calculates the number of rows and columns of targets that can fit in the source using the inline method (same orientation).

#### Parameters

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the source rectangle.

##### target

[`ISquareSize`](../interfaces/ISquareSize.md)

The size of the target rectangle.

##### margin

[`ISquareSize`](../interfaces/ISquareSize.md)

The margin around the target rectangles.

#### Returns

[`IMatrixGrid`](../interfaces/IMatrixGrid.md)

The number of rows and columns that can fit.

#### Throws

Throws an error if a division by zero would occur.

***

### \_isValidColor()

> `private` **\_isValidColor**(`color`): `boolean`

Checks if a given string is a valid CSS color.

#### Parameters

##### color

`string`

The color string to validate.

#### Returns

`boolean`

boolean - True if the color is valid, false otherwise.

***

### \_plottingCanvasRectLayout()

> `private` **\_plottingCanvasRectLayout**(`context`, `rectangles`, `startIndex`, `outerColor`, `innerColor`): `void`

Plots the rectangles in the layout on the canvas.

#### Parameters

##### context

`CanvasRenderingContext2D`

The 2D rendering context for drawing on the canvas.

##### rectangles

[`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[]

An array of IRectMatrixResult, each representing a rectangle.

##### startIndex

`number`

The starting index for drawing the text on the inner rectangles.

##### outerColor

`string`

The color for drawing the outer rectangles.

##### innerColor

`string`

The color for drawing the inner rectangles.

#### Returns

`void`

#### Remarks

- It first draws the outer rectangles if the margin is greater than 0, and then draws the inner rectangles.
- It also draws the stroke and fills the rectangles with the specified colors.
- Finally, it draws the text on the inner rectangles using the specified font and text color.

***

### \_plottingSvgRectLayout()

> `private` **\_plottingSvgRectLayout**(`svgElement`, `rectangles`, `startIndex`, `outerColor`, `innerColor`): `SVGSVGElement`

Draws the rectangles on an SVG document. 
- It first draws the outer rectangle, 
- then the inner rectangle, 
- and finally the text in the middle of the inner rectangle.

#### Parameters

##### svgElement

`SVGSVGElement`

The SVG element to draw on.

##### rectangles

[`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[]

The array of rectangles to draw.

##### startIndex

`number`

The starting index for numbering the rectangles.

##### outerColor

`string`

The color for the outer rectangle.

##### innerColor

`string`

The color for the inner rectangle.

#### Returns

`SVGSVGElement`

The SVG element with the rectangles drawn.

***

### \_validateConfig()

> `private` **\_validateConfig**(`config`): `void`

Validates the configuration object.

#### Parameters

##### config

[`ILayoutConfig`](../interfaces/ILayoutConfig.md)

The configuration object to validate.

#### Returns

`void`

#### Throws

Throws an error if any configuration property is invalid.

***

### \_validateDivisionByZero()

> `private` **\_validateDivisionByZero**(`dividend`): `void`

Checks if a division by zero is about to occur.

#### Parameters

##### dividend

`number`

The value to be divided.

#### Returns

`void`

#### Throws

Throws an error if the division would result in a division by zero.

***

### \_validateGrid()

> `private` **\_validateGrid**(`grid`): `void`

Validates the grid object.

#### Parameters

##### grid

[`IMatrixGrid`](../interfaces/IMatrixGrid.md)

The grid to validate.

#### Returns

`void`

#### Throws

Throws an error if the grid row or column values are invalid.

***

### \_validateMargin()

> `private` **\_validateMargin**(`margin`, `source`, `target`): `void`

Validates the margin size.

#### Parameters

##### margin

[`ISquareSize`](../interfaces/ISquareSize.md)

The margin size to validate.

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The source size to use for validation.

##### target

[`ISquareSize`](../interfaces/ISquareSize.md)

The target size to use for validation.

#### Returns

`void`

#### Throws

Throws an error if the margin dimensions are invalid.

***

### \_validateRectMatrixArray()

> `private` **\_validateRectMatrixArray**(`rectMatrixArray`): `void`

Validates the rect matrix array.

#### Parameters

##### rectMatrixArray

[`IRectMatrixResult`](../interfaces/IRectMatrixResult.md)[][]

The matrix array to validate.

#### Returns

`void`

#### Throws

Throws an error if the matrixArray is empty or undefined or not an array.

***

### \_validateRemainXY()

> `private` **\_validateRemainXY**(`remainX`, `remainY`): `void`

Checks if the remainX or remainY has negative value.

#### Parameters

##### remainX

`number`

The remainX value.

##### remainY

`number`

The remainY value.

#### Returns

`void`

#### Throws

Throws an error if a negative remainX or remainY is calculated.

***

### \_validateSource()

> `private` **\_validateSource**(`source`): `void`

Validates the source size.

#### Parameters

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The source size to validate.

#### Returns

`void`

#### Throws

Throws an error if the source dimensions are invalid.

***

### \_validateTarget()

> `private` **\_validateTarget**(`target`, `source`, `margin`): `void`

Validates the target size.

#### Parameters

##### target

[`ISquareSize`](../interfaces/ISquareSize.md)

The target size to validate.

##### source

[`ISquareSize`](../interfaces/ISquareSize.md)

The source size to use for validation.

##### margin

[`ISquareSize`](../interfaces/ISquareSize.md)

The margin size to validate.

#### Returns

`void`

#### Throws

Throws an error if the target dimensions are invalid.

***

### calculate()

> **calculate**(): [`ILayoutResult`](../interfaces/ILayoutResult.md) & `object`

Calculates the layout of rectangles based on the source, target, and margin sizes.
It determines the optimal arrangement of target rectangles within the source rectangle,
considering the specified margin and whether to use inline or cross-cutting methods.

#### Returns

[`ILayoutResult`](../interfaces/ILayoutResult.md) & `object`

An object containing the main and optional remaining rectangles, along with the total number of rectangles.

#### Throws

Throws an `error` if the number of rows or columns in the grid is zero or negative.

#### Example

```ts

 // class declaration
 const calculator = new CalculatorLayoutClass(A, B, C);
 // run the method         
 result = calculator.calculate(); 
 // calculation results
 console.log(`Calculation result :`, result);

 ```

#### See

- Output [Interface](../interfaces/ILayoutResult.md).

***

### drawCanvas()

> **drawCanvas**(`resourceURL`?): `string` \| `HTMLCanvasElement`

Draws the calculated layout on the canvas and returns `HTMLCanvasElement` data.

#### Parameters

##### resourceURL?

`boolean` = `true`

+ If `true`, returns is a base64 encoded data URL.
+ If `false`, returns the raw Canvas string. Defaults to `true`.

#### Returns

`string` \| `HTMLCanvasElement`

The data as either a base64 encoded data URL or a raw `HTMLCanvasElement` string.

#### Remarks

- It first calculates the layout, then draws the main and remaining rectangles,
- and finally returns the Canvas drawing data as either a base64 encoded string or a raw Canvas string.

*`note`: When generating layouts as a `<canvas/>`, please note that canvas elements are pixel-based. 
This means that the canvas will need to be __resized exponentially__ to achieve the actual size `(1px x 28,346 = 1cm)`. 
which can impact rendering and generating performance and will produce bigger file sizes.
Make sure the [\_\_canvas size\_\_](CalculatorLayoutClass.md#_source-1) and [\_\_ratio\_\_](CalculatorLayoutClass.md#config) you use are optimized for performance and provide the best possible user experience.*

#### Default Value

>*resourceURL*: `boolean` =  `true`

#### Throws

Throws an `error` if there is an issue during the drawing process.

#### Example

+ Class Declaration
```ts

 // class declaration
 const calculator = new CalculatorLayoutClass(A, B, C);
 // calculate layout. 
 const result = calculator.calculate(); 

```
+ `drawing` output as **`base64 .jpeg`**
```ts

 // draw layout
 const layout = calculator.drawCanvas(); // ** this will return base64Image **
 // base64 .jpeg result
 console.log(`image url :`, layout);
 
```
+ `drawing` output as **`<canvas/>`** element
```ts

 // ** If you need to returned `<canvas/>` element, set `param` to `false` **
 const canvasElement: HTMLCanvasElement = calculator.drawCanvas(false);
 
 console.log(`canvas :`, canvasElement);
 
 ```
*`note`: You can skip `calculate()` method if you want, drawing will automatically calculating the layout to plot the rects in.

***

### drawSvg()

> **drawSvg**(`resourceURL`?): `string` \| `SVGSVGElement`

Draws the calculated layout on an SVG document and returns the SVG data.

#### Parameters

##### resourceURL?

`boolean` = `true`

+ If `true`, returns the SVG as a base64 encoded data URL.
+ If `false`, returns the raw SVG string. Defaults to `true`.

#### Returns

`string` \| `SVGSVGElement`

The SVG data as either a base64 encoded data URL or a raw SVG string.

#### Remarks

- It first calculates the layout, then draws the main and remaining rectangles,
- and finally returns the SVG data as either a base64 encoded data URL or a raw SVG string.

***`*note`**: although **`<svg/>`** can work using **`cm`** unit, but it is set based on `pixel` unit with *[ratio multiplier](CalculatorLayoutClass.md#config)* to achieve the same result. 
because cm unit will cause clipping **`issue`** when viewing in browser for unknown reason.*

#### Default Value

>*resourceURL*: `boolean` =  `true`

#### Throws

Throws an error if there is an issue during the drawing process.

#### Example

+ Class Declaration
```ts

 // class declaration
 const calculator = new CalculatorLayoutClass(A, B, C);
 // calculate layout. 
 const result = calculator.calculate(); 

```
+ `drawing` output as **`base64 .svg`**
```ts

 // draw layout
 const layout = calculator.drawSvg(); // ** this will return base64Image **
 // base64 .svg result
 console.log(`base64 svg url :`, layout);
 
```
+ `drawing` output as **`<svg/>`** element
```ts

 // ** If you need to returned `<svg/>` element, set `param` to `false` **
 const svgElement: SVGSVGElement = calculator.drawSvg(false);
 
 console.log(`svg :`, svgElement);
 
 ```
*`note`: You can skip `calculate()` method if you want, drawing will automatically calculating the layout to plot the rects in.

***

### reset()

> **reset**(): `void`

Resets the canvas element and its 2D context to their initial states.

#### Returns

`void`

#### Remarks

This method is useful when you want to clear the canvas and start over.
It removes the canvas element from the DOM, resets the 2D context,
and clears the console.
*

#### Example

+ `drawing`
```ts

 // class declaration
 const calculator = new CalculatorLayoutClass(A, B, C);

 // draw layout to returned `<svg/>` element
 const svgElement: SVGSVGElement = calculator.drawSvg(false);
 console.log(`svg :`, svgElement);

```
+ **`reset calculator`** a `null` is expected.
```ts

 calculator.reset();
 console.log(`svg :`, svgElement); // will be `null`.
 
 ```
