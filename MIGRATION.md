# Migration Guide

## 0.1.x to 0.2.x

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

## Upcoming: 0.3.0

0.3.0 is planned to include behavior changes:

- Chaining will return a new value instead of mutating the receiver.
- Construction, string conversion, and number formatting will be made
  consistent with the current value.
- `value` will be exposed as readonly.

Until 0.3.0, convert chained values explicitly when a primitive number is
required, and avoid relying on mutation of a chained instance:

```js
const timeout = +Time.seconds(1).minutes(1);
```

This section will be expanded with concrete before/after examples when the
0.3.0 release is prepared.
