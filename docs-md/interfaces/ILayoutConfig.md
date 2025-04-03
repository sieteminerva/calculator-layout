[**Layout Calculator**](../README.md)

***

[Layout Calculator](../README.md) / ILayoutConfig

# Interface: ILayoutConfig

ILayoutConfig
[ILayoutConfig](ILayoutConfig.md)
Configures the visual aspects of the paper layout, including colors, fonts, and line widths.

## See

[Click here](https://www.w3.org/wiki/CSS/Properties/color/keywords), to learn CSS valid color string.

## Properties

### fonts?

> `optional` **fonts**: `object`

The font settings.

#### family?

> `optional` **family**: `string`

#### size?

> `optional` **size**: `number`

#### unit?

> `optional` **unit**: `string`

***

### lineWidth?

> `optional` **lineWidth**: `number`

The width of the lines for the outlines. Defaults to 1.

***

### mainInnerColor?

> `optional` **mainInnerColor**: `string`

The fill color of the main inner rectangles. Defaults to 'lightgreen'. valid css color

***

### mainOuterColor?

> `optional` **mainOuterColor**: `string`

The fill color of the main outer rectangles. Defaults to 'skyblue'. valid css color

***

### paperColor?

> `optional` **paperColor**: `string`

The background color of the paper. Defaults to 'rgb(233, 229, 229)'.

***

### ratio?

> `optional` **ratio**: `number`

The aspect ratio of the rectangles. Defaults to 1 (affects both width and height quality).

***

### remainInnerColor?

> `optional` **remainInnerColor**: `string`

The fill color of the remaining inner rectangles. Defaults to 'lightcoral'. valid css color

***

### remainOuterColor?

> `optional` **remainOuterColor**: `string`

The fill color of the remaining outer rectangles. Defaults to 'lightsalmon'. valid css color

***

### strokeColor?

> `optional` **strokeColor**: `string`

The color of the rectangle outlines. Defaults to 'rgb(85, 85, 85)'.

***

### textColor?

> `optional` **textColor**: `string`

The color of the text inside the inner rectangles. Defaults to 'rgb(85, 85, 85)'.
