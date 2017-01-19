Squarespace Darwin
------------------------------

Passthrough implementation of MutationObserver designed to make it easier to use, handling DOM querying, browser compatibility, and other stuff like that for you.

*NOTICE: This code is licensed to you pursuant to Squarespace’s Developer Terms of Use. See license section below.*

## Usage

````sh
npm install @squarespace/darwin;
````

````js
import Darwin from '@squarespace/darwin';

const instance = new Darwin({
  callback: () => {
    console.log('Mutation observed!');
  },
  targets: [
    '.my-mutating-node'
  ]
});
````

### Using ES6

If you prefer to handle transpiling and polyfilling on your own, you can import ES6 from Darwin:

```js
import darwin from '@squarespace/darwin/src';
```

Alternately, Darwin specifies a `module` property in `package.json` that points to the uncompiled `src/index.js`, so you may be able to simply import `@squarespace/darwin` if you're using one of the following bundlers:
* [Webpack 2](https://webpack.js.org/configuration/resolve/#resolve-mainfields)
* [Rollup](https://github.com/rollup/rollup-plugin-node-resolve#rollup-plugin-node-resolve)

## Reference

### new Darwin(config)
**Params**
* config `Object` - Config object
* config.callback `Array` - Callback function to run when mutations occur
* config.targets `Boolean` - Selectors of targets to observe

### Darwin.init()
Create a new MutationObserver and instruct it to observe the targets you gave it.

### Darwin.destroy()
Unbind all event listeners, disconnect the MutationObserver and null it out.

## License
Portions Copyright © 2016 Squarespace, Inc. This code is licensed to you pursuant to Squarespace’s Developer Terms of Use, available at http://developers.squarespace.com/developer-terms-of-use (the “Developer Terms”). You may only use this code on websites hosted by Squarespace, and in compliance with the Developer Terms. TO THE FULLEST EXTENT PERMITTED BY LAW, SQUARESPACE PROVIDES ITS CODE TO YOU ON AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.