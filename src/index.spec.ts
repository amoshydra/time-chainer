import { expect, it } from 'vitest';
import T, { Time } from './index';

// Usage testing
it('should output correct value with its static methods', () => {
  expect(+T.milliseconds(1)).toBe(1);
  expect(+T.seconds(1)).toBe(1000);
  expect(+T.minutes(1)).toBe(60 * 1000);
  expect(+T.hours(1)).toBe(60 * 60 * 1000);
  expect(+T.days(1)).toBe(24 * 60 * 60 * 1000);
  expect(+T.weeks(1)).toBe(7 * 24 * 60 * 60 * 1000);
});

it('should output 0 when 0 is given as param', () => {
  expect(+T.milliseconds(0)).toBe(0);
  expect(+T.seconds(0)).toBe(0);
  expect(+T.minutes(0)).toBe(0);
  expect(+T.hours(0)).toBe(0);
  expect(+T.days(0)).toBe(0);
  expect(+T.weeks(0)).toBe(0);
});

it('should output 0 when nothing is given as param', () => {
  expect(+T.milliseconds()).toBe(0);
  expect(+T.seconds()).toBe(0);
  expect(+T.minutes()).toBe(0);
  expect(+T.hours()).toBe(0);
  expect(+T.days()).toBe(0);
  expect(+T.weeks()).toBe(0);

  expect(+T.milliseconds(undefined)).toBe(0);
  expect(+T.seconds(undefined)).toBe(0);
  expect(+T.minutes(undefined)).toBe(0);
  expect(+T.hours(undefined)).toBe(0);
  expect(+T.days(undefined)).toBe(0);
  expect(+T.weeks(undefined)).toBe(0);

  expect(+T.milliseconds(null)).toBe(0);
  expect(+T.seconds(null)).toBe(0);
  expect(+T.minutes(null)).toBe(0);
  expect(+T.hours(null)).toBe(0);
  expect(+T.days(null)).toBe(0);
  expect(+T.weeks(null)).toBe(0);
});

it('should work with chaining', () => {
  const OF_8_DAYS = 8 * (24 * 60 * 60 * 1000);

  expect(+T.weeks(1).days(1)).toBe(OF_8_DAYS);
});

it('should allow 0 or nothing during chaining', () => {
  const OF_8_DAYS = 8 * (24 * 60 * 60 * 1000);

  expect(+T.weeks(1).days(0).days(1)).toBe(OF_8_DAYS);
  expect(+T.weeks(1).days().days(1)).toBe(OF_8_DAYS);
  expect(+T.weeks(1).days(null).days(1)).toBe(OF_8_DAYS);
  expect(+T.weeks(1).days(undefined).days(1)).toBe(OF_8_DAYS);
});

it('should not mutate the receiver when chaining', () => {
  const base = T.milliseconds(1000);
  const chained = [
    base.milliseconds(1),
    base.seconds(1),
    base.minutes(1),
    base.hours(1),
    base.days(1),
    base.weeks(1),
  ];

  expect(chained.map(Number)).toEqual([
    1001,
    2000,
    61_000,
    3_601_000,
    86_401_000,
    604_801_000,
  ]);
  expect(chained.every((value) => value !== base)).toBe(true);
  expect(+base).toBe(1000);
});

it('should keep the boxed value and formatting in sync', () => {
  expect(new T().value).toBe(0);
  expect(new T(NaN).value).toBe(0);
  expect(String(new T())).toBe('0');
  expect(String(T.milliseconds())).toBe('0');
  expect(String(T.seconds(undefined))).toBe('0');
  expect(String(T.seconds(NaN))).toBe('0');

  const chained = T.seconds(1).minutes(1);

  expect(chained.value).toBe(61_000);
  expect(+chained).toBe(61_000);
  expect(Number(chained)).toBe(61_000);
  expect(String(chained)).toBe('61000');
  expect(`${chained}`).toBe('61000');
  expect(chained.toFixed(0)).toBe('61000');
  expect(Number.prototype.toString.call(chained)).toBe('61000');
  expect(JSON.stringify(chained)).toBe('61000');
});

it('should accept boxed numbers and Time values', () => {
  expect(+T.milliseconds(Object(42))).toBe(42);
  expect(+T.milliseconds(T.seconds(1))).toBe(1000);
});

it('should expose the same constructor as default and named exports', () => {
  expect(Time).toBe(T);
  expect(new T()).toBeInstanceOf(Time);
  expect(new T(500).valueOf()).toBe(500);
});

// Implementation Assertions
it('static methods should produce instance of T', () => {
  expect(T.milliseconds(1)).toBeInstanceOf(T);
  expect(T.seconds(1)).toBeInstanceOf(T);
  expect(T.minutes(1)).toBeInstanceOf(T);
  expect(T.hours(1)).toBeInstanceOf(T);
  expect(T.days(1)).toBeInstanceOf(T);
  expect(T.weeks(1)).toBeInstanceOf(T);
  expect(T.seconds(1)).toBeInstanceOf(Number);
});

// Implementation Assertions
it('instance methods should produce instance of T', () => {
  expect(new T().milliseconds(1)).toBeInstanceOf(T);
  expect(new T().seconds(1)).toBeInstanceOf(T);
  expect(new T().minutes(1)).toBeInstanceOf(T);
  expect(new T().hours(1)).toBeInstanceOf(T);
  expect(new T().days(1)).toBeInstanceOf(T);
  expect(new T().weeks(1)).toBeInstanceOf(T);
});

// Type coercion
it('stringification should produce number string', () => {
  expect(
    JSON.stringify({
      time: T.seconds(0),
    })
  ).toBe(
    JSON.stringify({
      time: 0,
    })
  );

  expect(
    JSON.stringify({
      time: T.seconds(0),
    })
  ).not.toBe(
    JSON.stringify({
      time: '0',
    })
  );

  expect(
    JSON.stringify({
      time: T.seconds(1).minutes(1),
    })
  ).toBe(
    JSON.stringify({
      time: 61000,
    })
  );
});
