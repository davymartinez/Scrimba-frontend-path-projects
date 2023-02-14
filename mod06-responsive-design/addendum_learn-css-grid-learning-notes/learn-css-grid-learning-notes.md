# Learn CSS Grid for free

## Intro to the CSS Grid course

### Benefits of CSS Grid over frameworks such as Bootstrap

* It makes markup cleaner.
* It gives more flexibility by separating the layout from the HTML even more.

### CSS Grid terminology (via [Firefox Devtools](https://mozilladevelopers.github.io/playground/css-grid))

* Grid lines: the vertical and horizontal lines that divide the grid and separate the columns and rows.
* Grid cell: a single unit of a CSS grid.
* Grid area: rectangular space surrounded by four grid lines. A grid area can contain any number of grid cells.
* Grid track: the space between two grid lines. This space can be horizontal or vertical.
* Grid row: a horizontal track of a grid.
* Grid column: a vertical track of a grid.
* Gutter: the space between rows and columns in a grid.

## Your first CSS grid

* We invoke CSS Grid by declaring `display: grid` on your CSS file (or a `<style>` HTML tag).
* `grid-template-columns` specifies the number of colums of the grid and their widths. Example:
  * `grid-template-columns: 100px auto 100px;` (`auto` means that the column will take up whatever space is left available between the other two columns, responsively)
* `grid-template-rows` specifies the number of rows of the grid and their heights. Example:
  * `grid-template-rows: 50px 60px;`
* You can change a grid's layout by just adding/removing columns and/or rows on the `grid-template-columns` and `grid-template-rows` declarations, without touching the HTML.
* You can add space between components of a grid by using the `grid-gap` property. Example:
  * `grid-gap: 5px;`

## Fraction units and `repeat()`

* The `fr` unit is a "*fr*actional" way of specifying sizes in CSS Grid's rows and columns. It keeps us from having to constantly think in terms of pixels when laying out grid items. Example:
  * `grid-template-columns: 1fr 1fr 1fr;` declares three columns of the exact same size no matter the width of the page, as each one takes up exactly 1 fraction of the size of the whole width
  * `grid-template-columns: 1fr 2fr 1fr;` will make the second colum be twice as wide as the other two, as it takes up 2 fractions of the whole width
* The `repeat()` function lets us write repetitive unit declarations with a single expression. It takes two arguments, the repeat count and the track list. Example:
  * With `repeat()` we can write `grid-template-columns: 1fr 1fr 1fr;` as: `grid-template-columns: repeat(3, 1fr);`

### The `grid-template` shorthand

* We can declare grid template rows and columns in just a single line with `grid-template`. Example:
  * `grid-template: repeat(2, 50px) / repeat(3, 1fr);` -- here, the declaration on the left of the `/` stands for the rows, while the one on the right stands for the columns

## Positioning items

* We can position items in the grid by using `grid-column-start` and `grid-column-end`, which specify the starting and ending lines of the items' columns. Example:
  * `grid-column-start: 1;`
  * `grid-column-end: 3`
* We can also declare the example above with the `grid-column` shorthand:
  * `grid-column: 1 / 3;`
* Do notice that the above declarations depend on having two columns, which in turn have 3 lines (the starting line, the line that separates both columns, and the ending line).
* We can also use `span` to declare how many columns to take:
  * `grid-column: 1 / span 2;` does the same as the previous example, as it will begin on line 1 and span two lines from there
* If we don't know exactly how many columns we will be dealing with, we can use a negative end:
  * `grid-column: 1 / -1;` -- here, the `-1` means the column will end in the last line of whatever the last column is
* We can apply all of the above to rows by using `grid-row` instead.

## Template areas

* Template areas allow us to define grid layouts in terms of a visual representation of the different areas of that same grid. For this, we use the `grid-template-areas` property, which is used in conjunction with the `grid-area` one.
* In the following example, we define a grid with 12 * 1fr columns, 3 rows and the corresponding areas for layout (template areas are defined as rows of strings):

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: 80px 1fr 1fr 100px;
    grid-template-areas:
        "header header header"
        "menu content-1 content-1"
        "menu content-2 content-2"
        "footer footer footer";
}

.header {
    grid-area: header;
}

.menu {
    grid-area: menu;
}

.content-1 {
    grid-area: content-1;
}

.content-2 {
    grid-area: content-2;
}

.footer {
    grid-area: footer;
}
```

* Blank or empty areas can be defined by means of a dot (`"."`), for example: `grid-template-areas: ". footer .";`, which will create two blank spaces surrounding the footer area.

## Auto-fit and minmax

* The `auto-fit` value attempts to squeeze as many grid items as possible inside its axis (either columns or rows). Example:
* `grid-template-columns: repeat(auto-fit, 100px);` will squeeze as many 100px columns inside the container as possible, depending on its width. This means that if the container's width is, for example, 480px, the row will contain four columns, but if it increases to 520px, it will add another column. Conversely, if the container's width is, for example, 320px, it will contain three columns, but if it decreases to 280px, then it will only contain two columns.
* The `minmax()` function sets a range of values for our grid items widths or heights, depending if these are columns or rows. For example:
* `grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))` will change the size of the columns so that, as a minimum, they will be 100px, but they can stretch to wider values so the container's row is taken up entirely and no blank spaces are created at the row's end (which can happen in the previous example, therefore, this is one is a more responsive example).

## Implicit rows

* Implicit rows are created when our grid shrinks and tracks that used to be columns in wider views turn to rows and fail to retain the declared size (they may look overall "shorter").
* We can fix this issue with the property `grid-auto-rows` which assigns a explicit size to any newly created row. Example:
  * `grid-auto-rows: 100px;` will make every newly created implicit row 100px tall

## `grid-auto-flow`

* The `grid-auto-flow` property is a convenient way to deal with responsive grid layouts where tracks might have different sizes that might break the flow of the rows and columns, thus creating unwanted blank spaces in the grid.
* Values for `grid-auto-flow` can be `row`, `column`, `dense`, `row dense`, and `column dense`.
* `row` places each item by filling each row in turn and adding new rows as needed.
* `column` does the same but with columns.
* `dense` fills in holes earlier as they occur in the grid, if smaller items come up later. When using `grid-auto-flow: dense;` items may appear out of order with respect to the HTML.

## Named lines

* We can assign names to our grid lines to use them instead of numbers when defining our layouts. To name our grid lines we just add the desired name inside square brackets. For example:

```css
.container {
    display: grid;
    grid-template-columns:
        [main-start sidebar-start] 200px
        [sidebar-end content-start] 1fr
        [column3-start] 1fr
        [content-end main-end];`
    grid-template-rows:
        [row1-start] 80px
        [row2-start] 1fr
        [row3-start] 1fr
        [row4-start] 100px
        [row4-end];
}

.header {
    grid-column: main-start / main-end;
    grid-row: row1-start / row2-start;
}

.sidebar {
    grid-column: sidebar-start / sidebar-end;
    grid-row: row2-start / row4-start;
}

.content-1 {
    grid-column: content-start / content-end;
    grid-row: row2-start / row3-start;
}
```

* In the previous example, named lines are all the identifiers inside square brackets, such as `[main-start]`, `[sidebar-end]`, and `[row1-start]`.
* Also, a single line might have two or more names, as we can see with `[main-start sidebar-start]`, which means that the first line of our grid will serve as the start line for both our "main" and "sidebar" areas.
* After defining our named lines, we use them instead of line numbers to position our elements' starting and ending points inside the grid.

## `justify-content` and `align-content`

* The `justify-content` property allows us to distribute spaces between and around our grid items along the row or main axis. It uses the following values:
  * `end`: aligns everything to the right
  * `center`: centers our grid items inside the container
  * `space-between`: creates an even distribution between grid items and pushes the first and last items to the sides of the container
  * `space-around`: creates an even distribution between grid items but the space between them is the same and does not push the first and last items to the sides of the container (it creates a half-space between these items and their respective starting and ending lines of the container)
  * `space-evenly`: just like `space-around` but all spacings are equal between items and starting and ending lines of the container
* The `align-content` property allows us to distribute spaces between and around our grid items as well, but along the column or block axis. It features the following values:
  * `start`: packs the grid items against the container's start edge in the block axis
  * `end`: packs the grid items against the container's end edge in the block axis
  * `center`: packs the grid items in the container's center in the block axis
  * `space-between`: distributes the items evenly within the container along the block axis, with spacing between items being the same and pushing the first and last items against the edges of the container in the block axis
  * `space-around`: distributes the items evenly within the container along the block axis, with spacing between items being the same and creating a half-space between the first and last items and the edges of the container in the block axis
  * `space-evenly`: just like `space-around` but all spacings are equal between items and starting and ending lines of the container across the block axis

## `justify-items` and `align-items`

* The `justify-items` property aligns inline grid items inside the box. The most commonly used values are:
  * `stretch`: stretches the item to fill the grid cell if the width is not set
  * `start` and `end`: align items at either the start or end in the inline direction
  * `left`, `center`, and `right`: align items to the left, center, and right, respectively
* The `align-items` property aligns block items inside the box. The most commonly used values are:
  * `stretch`: items are stretched to fit the container
  * `center`: items are positioned at the center of the container
  * `start` and `end`: items are positioned at either the start or the end of their individual grid cells, in the block direction

## `auto-fill` vs. `auto-fit`

* These are keywords we can use with the `repeat()` function to specify how to handle column sizing and item wrapping.
* `auto-fill` fills the row with as many columns as it can fit, so it creates implicit columns whenever a new one can fit. That is, it tries to fill the row with as many columns as possible. The newly added columns may be empty but still occupy a space in the row. Example:ç
  * `grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));`
* `auto-fit` fits the currently available columns into the space by stretching them so that they take up any available space. Example:
  * `grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));`

## Grid vs. Flexbox

* Flexbox is:
  * Intended for one-dimensional layouts, going in one direction at a time, like single rows or single columns.
  * Content-first: we let the content dictate most of the decisions of where the items are going to be placed across the container.
* CSS Grid is:
  * Built for two-dimensional layouts, dealing with several rows and columns at the same time.
  * Layout-first: we first define our layout (with `grid-template`) and then place the items according to it.
