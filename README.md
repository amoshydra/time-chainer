# Time Chainer
Create your milliseconds declaratively!

[![CircleCI](https://circleci.com/gh/amoshydra/time-chainer.svg?style=svg)](https://circleci.com/gh/amoshydra/time-chainer)
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
yarn add time-chainer
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
jest.advanceTimersByTime(+Time.days(30));
```

See details:

```js
Time.seconds(5) instanceof Number // true
typeof Time.seconds(5) // "object"
typeof +Time.seconds(5) // "number"
```
