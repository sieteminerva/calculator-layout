## Layout Calculator

**Version 1.0**
>[Demo](https://sieteminerva.github.io/calculator-layout/) | [Full Documentation](docs-md/README.md)

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

#### Author
*YMGH*

---

### Usage Example

***[1]*** *`set` the **`param`** & **`config`**.*
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
***[2]*** ***`run`** the calculator.*
 ```ts

const calculator = new CalculatorLayoutClass(source, target, margin);
// ** Assign the `configuration` **
calculator.config = layoutConfig;

// ** Run Calculation **
const result = calculator.calculate();
console.log(`result`, result.total);

```
***[3]*** *get **`drawing`** a layout.*
```ts

// ** Drawing Layout as base64svg **
const svg = calculator.drawSvg();
console.log(`svg base64`,  svg);

```
***[4]*** ***`reset`** calculator* 
```ts

 calculator.reset();
 console.log(`svg :`, svgElement); // will be `null`.
 
 ```

#### See

- How to `set` the [config](readme.md#config).
- Available `interface` [ILayoutConfig](). 
- How to `perform` a calculation [method](readme.md#calculate). 
- How to `get` an output as `.svg base64 encoded` or `<svg/> Element` [method](readme.md#drawsvg).
- How to `get` an output as `.jpeg base64 encoded` or `<canvas/> Element` [method](readme.md#drawcanvas).



## *`Constructors`*

### new CalculatorLayoutClass()

> **new CalculatorLayoutClass**(`_source`, `_target`, `_margin`, `_useInline`?): [`CalculatorLayoutClass`](readme.md#constructors)

#### Parameters

#### *\_source* : [`ISquareSize`]()

#### *\_target* : [`ISquareSize`]()

#### *\_margin* : [`ISquareSize`]() = `{ width: 0, height:0 }`

#### *\_useInline ?* : `boolean` = `true`

Flag to determine the calculation method (true: inline, false: cross). Defaults to true.

#### Returns

[`CalculatorLayoutClass`](readme.md#constructors)

#### Throws

Throws an error if source, target, or margin dimensions are invalid.

#### Default Value

```ts
_margin = { width: 0, height: 0 };
_useInline = true;
```



## _`config`_

#### Get Signature

> **get** **config**(): [`ILayoutConfig`]()

##### Returns

[`ILayoutConfig`]()

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

###### See

+ Configuration [interface]()
+ [Valid CSS Color](https://www.w3.org/wiki/CSS/Properties/color/keywords).




## Methods

### *`calculate()`*

> **calculate**(): [`ILayoutResult`]() & `object`

Calculates the layout of rectangles based on the source, target, and margin sizes.
It determines the optimal arrangement of target rectangles within the source rectangle,
considering the specified margin and whether to use inline or cross-cutting methods.

#### Returns

[`ILayoutResult`]() & `object`

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

###### See

- Output [Interface]().

***

### *`drawCanvas()`*

> **drawCanvas**(`resourceURL`?): `string` \| `HTMLCanvasElement`

Draws the calculated layout on the canvas and returns `HTMLCanvasElement` data.

#### Parameters

#### *resourceURL?* : `boolean` = `true`

 - If true, returns is a base64 encoded data URL.
 - If false, returns the raw Canvas string. Defaults to true.

#### Returns

`string` | `HTMLCanvasElement`

 - The data as either a base64 encoded data URL or a raw `HTMLCanvasElement` string.

#### Remarks

It first calculates the layout, then draws the main and remaining rectangles,
and finally returns the Canvas drawing data as either a base64 encoded string or a raw Canvas string.


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
*`note`: You can skip `calculate()` method if you want, drawing will automatically calculating layout to plot the rect in

***

### drawSvg()

> **drawSvg**(`resourceURL`?): `string` \| `SVGSVGElement`

Draws the calculated layout on an SVG document and returns the SVG data.

#### Parameters

##### resourceURL? : `boolean` = `true`

- If true, returns the SVG as a base64 encoded data URL.
- If false, returns the raw SVG string. Defaults to true.

#### Returns

`string` \| `SVGSVGElement`

The SVG data as either a base64 encoded data URL or a raw SVG string.

#### Remarks

- It first calculates the layout, then draws the main and remaining rectangles,
- and finally returns the SVG data as either a base64 encoded data URL or a raw SVG string.

#### Throws

 - Throws an error if there is an issue during the drawing process.

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
*`note`: You can skip `calculate()` method if you want, drawing will automatically calculating layout to plot the rect in

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
