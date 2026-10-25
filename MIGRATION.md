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

## 0.3.0

0.3.0 changes chaining and coercion behavior. Import paths, static methods, and
`Time extends Number` are unchanged.

### Chaining no longer mutates

Each instance method returns a new value instead of changing the receiver.

```js
// 0.2.x
const mutating = Time.seconds(1);
mutating.minutes(1);
+mutating; // 61000

// 0.3.x
const time = Time.seconds(1);
const later = time.minutes(1);
+time;  // 1000
+later; // 61000
```

If you used chaining for its side effect, capture the returned value:

```js
// Before
const timeout = Time.seconds(1);
timeout.minutes(1);
setTimeout(fn, +timeout);

// After
const timeout = Time.seconds(1).minutes(1);
setTimeout(fn, +timeout);
```

### String conversion and formatting use the current value

The boxed `Number` value is now kept in sync with `.value`, so `String()`,
template literals, `toFixed()`, `toLocaleString()`, and the other `Number`
formatting methods reflect the chained result.

```js
// 0.2.x
const time = Time.seconds(1).minutes(1);
+time;              // 61000
String(time);       // "1000"
time.toFixed(0);    // "1000"

// 0.3.x
const time = Time.seconds(1).minutes(1);
+time;              // 61000
String(time);       // "61000"
time.toFixed(0);    // "61000"
```

Default and invalid inputs are normalized consistently:

```js
String(Time.milliseconds()); // "0" (was "NaN" in 0.2.x)
```

`+Time...` is still the recommended way to pass a primitive number to APIs that
require one.

### `value` is readonly

Code that assigns to `.value` must build a new value instead:

```js
// Before
const time = Time.seconds(1);
time.value = 5000;

// After
const resized = Time.milliseconds(5000);
```
