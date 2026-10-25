# Time Chainer
Create your milliseconds declaratively!

[![CI](https://github.com/amoshydra/time-chainer/actions/workflows/ci.yml/badge.svg)](https://github.com/amoshydra/time-chainer/actions/workflows/ci.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/amoshydra/time-chainer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/amoshydra/time-chainer?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/da62ee9d8b8afac74f9d/maintainability)](https://codeclimate.com/github/amoshydra/time-chainer/maintainability)
[![codecov](https://codecov.io/gh/amoshydra/time-chainer/branch/master/graph/badge.svg)](https://codecov.io/gh/amoshydra/time-chainer)

[![npm](https://nodei.co/npm/time-chainer.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/time-chainer)


# Install
```sh
npm install --save time-chainer
```

or

```sh
pnpm add time-chainer
```

# Example

```js
import Time from 'time-chainer';

// Do something after 5 seconds
setTimeout(() => {
  doSomething();

}, +Time.seconds(5));

// 3 Days and 12 hours later from now
new Date(
  new Date() + (
    Time
      .days(3)
      .hours(12)
  )
);

// 1 week + 15 days + 12 hours + 30 minutes + 30 seconds + 500 milliseconds
Time
  .milliseconds(500)
  .seconds(30)
  .minutes(30)
  .hours(12)
  .days(15)
  .weeks(1)
; // 1,945,830,500
```

## `TimeChainer` extends `Number`

Time Chainer extends `Number` object. In cases where a primitive number is strictly required, you will need to explicitly convert it to a primitive `number` by appending a `+` operator like this:

```js
vi.advanceTimersByTime(+Time.days(30));
```

See details:

```js
Time.seconds(5) instanceof Number // true
typeof Time.seconds(5) // "object"
typeof +Time.seconds(5) // "number"
```

## Upgrading from 0.1.x

Version 0.2.0 is ESM-first and adds an explicit `exports` map. The public
default and named API is unchanged.

### Import from the package root

ESM:

```js
import Time from 'time-chainer';
import { Time as TimeClass } from 'time-chainer';
```

CommonJS:

```js
const Time = require('time-chainer').default;
const { Time: TimeClass } = require('time-chainer');
```

### Replace deep imports

Deep imports into `dist/` are no longer supported.

ESM:

```js
// 0.1.x
import Time from 'time-chainer/dist/index.esm.js';

// 0.2.x
import Time from 'time-chainer';
```

CommonJS:

```js
// 0.1.x
const { default: Time } = require('time-chainer/dist/index.js');

// 0.2.x
const { default: Time } = require('time-chainer');
```

Use the package name for TypeScript imports as well:

```ts
import Time, { Time as TimeClass } from 'time-chainer';
```

### Browser script

The UMD build remains available for direct browser usage. It exposes the
`timeMaker` global:

```html
<script src="https://unpkg.com/time-chainer@0.2.0/dist/index.umd.js"></script>
<script>
  const Time = timeMaker.default;
  console.log(+Time.seconds(1));
</script>
```

### Node.js support

The published package does not declare a consumer `engines.node` restriction.
Development uses Node.js 24.11+ or 26+.

## Development

Development requires Node.js 24.11+ or 26+ and pnpm 10.33.2+.

```sh
pnpm install
pnpm test
pnpm run test:watch
pnpm run type-check
pnpm run lint
pnpm run build
```
