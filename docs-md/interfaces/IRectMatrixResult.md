[**Layout Calculator**](../README.md)

***

[Layout Calculator](../README.md) / IRectMatrixResult

# Interface: IRectMatrixResult

IRectMatrixResult
Represents the result of a single rectangle calculation within a grid.

## Properties

### grid

> **grid**: `object`

Information about the rectangle's position within the grid (row, column).

#### column

> **column**: `number`

#### row

> **row**: `number`

***

### inner

> **inner**: [`IRectPlotConfig`](IRectPlotConfig.md)

Configuration for the inner rectangle (position, dimensions).

***

### outer

> **outer**: [`IRectPlotConfig`](IRectPlotConfig.md)

Configuration for the outer rectangle (position, dimensions).
