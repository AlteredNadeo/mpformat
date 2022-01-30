# Maniaplanet Formatting Utilities

UMD/ESM TypeScript port of [maniaplanet-style-js-parser](https://github.com/maniaplanet/maniaplanet-style-js-parser) with some tweaks.

## Installation

```bash
$ npm i -S @altrd/mpformat
```

## Usage

### In node.js or browser via webpack/parcel/etc:

```javascript
// node.js
const { parse, toHTML, toPlainText } = require('@altrd/mpformat')
// webpack/parcel/etc (TypeScript supported)
import { parse, toHTML, toPlainText } from '@altrd/mpformat'

const html = toHTML(parse('$f00Red')) // => '<span style="color: #ff0000;">Red</span>'
const text = toPlainText(parse('$f00Red')) // => 'Red'
```

### In the browser via unpkg

```html
<script src="https://unpkg.com/@altrd/mpformat"></script>
```

```javascript
MPFormat.toHTML(MPFormat.parse('$f00Red'))
```
