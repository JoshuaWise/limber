# limber
A tiny, flexible, front-end framework for building responsive websites

Designed to be used with [not-supported](https://github.com/JoshuaWise/not-supported).

## A clean CSS environment

When you import limber, it does a few things for you automatically:
- Uses [normalize.css](https://necolas.github.io/normalize.css/) to fix browsers' default stylesheets
- Sets all elements to `box-sizing: border-box`
- Makes the `hmtl` and `body` elements behave more like proper containers
- Prevents `img` elements from overflowing their containers
- Prevents `textarea` elements from being resized horizontally (just vertically)
- Gives `a` elements the `cursor: pointer` property

## Limber options

Basic properties will be applied to your HTML elements based on your configured theme. You can configure your theme by setting certain stylus variables prior to importing limber. All configurable variables are listed [here](./src/styl/template/config/site-globals.styl).

## Classes

Limber provides several useful classes automatically.

- `base`: sets the text to be "unstyled" (the same as a `body` or `p` element).
- `clearfix`: the classic clearfix hack.
- `visually-hidden`: makes content only available to screen-readers/robots.
- `list-block`: removes styles from an `ol` or `ul`.
- `list-inline`: same as above, but list elements will be `inline-block`.

## Non-standard CSS Properties

#### `background-2x`/`background-image-2x`

These are the same as `background` and `background-image`, except that if they contain a url(...) call, they will transform the URI to have "@2x" at the end of the filename—on retina devices only.

If you use `url(path/to/file.png)`, you should also make sure a file called `path/to/file@2x.png` exists as well.

#### `border-radius`

This is the same as the standard `border-radius` property, but it also accepts a convenient syntax for controlling each side of the box differently.

```
border-radius bottom 4px
border-radius top left 1em
border-radius top 4px, bottom inherit
border-radius 4px, bottom right 50%
```

#### `middle`

The `middle` property centers an element on the one or both axes. The element must have its `position` property set to something besides `static` for this to work. You can optionally set its `position` with this property, as a second argument after the axis.

```
middle x
middle y absolute
middle xy relative
```

### `overflow`

This is the same as the standard `overflow` property, but it also accepts the extra value, `ellipsis`, which is the same as `overflow: hidden`, except that text will be truncated to a single line with a trailing ellipsis effect.

```
overflow ellipsis
```

### `static`/`relative`/`absolute`/`fixed`

These properties allow you to set the `left`, `right`, `top`, and `bottom` properties in a single line.

```
fixed top left 15px
absolute left right 0
absolute left right
relative left 5px, top 20px
static auto
```

### `size`/`min-size`/`max-size`

These properties allow you to set an element's `width` and `heigh` (respectively), or their `min-`/`max-` variants, in a single line. If only one value is provided, it is applied to both `width` *and* `height`.

```
size 50px
size 30% 2em
min-size 33%
```

### `text-outline`

This property gives text a 1px outline with the specified color.

```
text-outline blue
```

## Functions

Many stylus functions are also provided.

#### `slice(list, start = 0, end = null)`

Returns a copy of a portion of a list. It mirros JavaScript's `Array.prototype.slice` in functionality. If only the first argument is provided, a shallow copy of the list is returned.

#### `sort(list, fn = null)`

Sorts a list **in place** (no copy is made), and returns the list. The default sorting function compares numbers by value, and strings by Unicode position.

#### `change(source, index, value)`

Returns a clone of the given source, but with the element at index `index` replaced by `value`.

#### `between(value-range, viewport-range = phone-range[0] desktop-range[1])`

Returns a `calc()` function that evaluates to a px value between `value-range[0]` and `value-range[1]`, depending on the viewport width's position between `viewport-range[0]` and `viewport-range[1]`. By default, `viewport-range` is `(phone-range[0] desktop-range[1])`.

#### `force-px(value)`

If the given value is a px unit, or can be converted to px while maintaining its value, convert it to px and return it. Otherwise, null is returned. This is useful for validating user input for custom functions.

#### `assert(test-value, error-message = 'assert failed')`

If the given value is truthy, nothing happens. Otherwise, throw an error message.

#### `reset-box-model()`

Removes any `margin`, `padding`, `border`, or `outline`.

#### `reset-font()`

Resets the `font-family` `font-size` `font-weight` `font-style`, and `vertical-align` to their default values (e.g., `inherit`).

#### `reset-table()`/`reset-table-cell()`

Resets properties of a table to make it behave as default.

## Media queries

The following media queries are provided for convenience.

- `@media phone`
- `@media mobile` (phone or tablet)
- `@media tablet`
- `@media booklet` (tablet or desktop)
- `@media desktop`
- `@media viewport-min` (smaller than phone)
- `@media viewport-max` (larger than desktop)
- `@media retina`

Each of these media queries can also be used from JavaScript.

```
if (Limber.mq.viewportMin) {
	console.log('screen is too small');
}
```

The values within `Limber.mq` get updated whenever the window is resized.

## Built-in components

The top of your `body` may contain the following elements:

```html
<noscript id="limber-noscript"></noscript>
<div id="limber-loader"><div id="limber-progress"></div></div>
```

The `#limber-noscript` element provides a convenient message for users that have JavaScript disabled.

The `#limber-loader` element provides a nice loading bar when the page is opened. See [here](./src/styl/loader/loader.styl) to learn how to customize the loading animation. To make the progress bar work, you must control it from JavaScript via `Limber.loader`, which is a Node.js-style EventEmitter with the following events:

- `progress`: emitted when its proress value changes
- `load`: emitted when its progress reaches 100
- `loading`: emitted when its progress changes from 100 to something lower

To make the progress bar move, just set `Limber.loader.progress` to a value between 0 and 100.
