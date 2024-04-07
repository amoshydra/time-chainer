// @ts-check
import T from './index';

const ZERO = 0;

// Usage testing
it('should output correct value with its static method', () => {
  expect(ZERO).toBe( T.milliseconds(1) - (1));
  expect(ZERO).toBe(      T.seconds(1) - (1000));
  expect(ZERO).toBe(      T.minutes(1) - (60 * 1000));
  expect(ZERO).toBe(        T.hours(1) - (60 * 60 * 1000));
  expect(ZERO).toBe(         T.days(1) - (24 * 60 * 60 * 1000));
  expect(ZERO).toBe(        T.weeks(1) - (7 * 24 * 60 * 60 * 1000));
});

it('should output 0 when 0 given as param', () => {
  expect(ZERO).toBe( T.milliseconds(0) - ZERO);
  expect(ZERO).toBe(      T.seconds(0) - ZERO);
  expect(ZERO).toBe(      T.minutes(0) - ZERO);
  expect(ZERO).toBe(        T.hours(0) - ZERO);
  expect(ZERO).toBe(         T.days(0) - ZERO);
  expect(ZERO).toBe(        T.weeks(0) - ZERO);
});

it('should output 0 when nothing given as param', () => {
  expect(ZERO).toBe( T.milliseconds() - ZERO);
  expect(ZERO).toBe(      T.seconds() - ZERO);
  expect(ZERO).toBe(      T.minutes() - ZERO);
  expect(ZERO).toBe(        T.hours() - ZERO);
  expect(ZERO).toBe(         T.days() - ZERO);
  expect(ZERO).toBe(        T.weeks() - ZERO);

  expect(ZERO).toBe( T.milliseconds(undefined) - ZERO);
  expect(ZERO).toBe(      T.seconds(undefined) - ZERO);
  expect(ZERO).toBe(      T.minutes(undefined) - ZERO);
  expect(ZERO).toBe(        T.hours(undefined) - ZERO);
  expect(ZERO).toBe(         T.days(undefined) - ZERO);
  expect(ZERO).toBe(        T.weeks(undefined) - ZERO);

  expect(ZERO).toBe( T.milliseconds(null) - ZERO);
  expect(ZERO).toBe(      T.seconds(null) - ZERO);
  expect(ZERO).toBe(      T.minutes(null) - ZERO);
  expect(ZERO).toBe(        T.hours(null) - ZERO);
  expect(ZERO).toBe(         T.days(null) - ZERO);
  expect(ZERO).toBe(        T.weeks(null) - ZERO);
});

it('should work with chaining', () => {
  const OF_8_DAYS = (8 * (24 * 60 * 60 * 1000));

  expect(ZERO).toBe( T.weeks(1).days(1) - OF_8_DAYS);
});

it('should allow 0 or nothing during chaining', () => {
  const OF_8_DAYS = (8 * (24 * 60 * 60 * 1000));

  expect(ZERO).toBe( T.weeks(1).days(0        ).days(1) - OF_8_DAYS);
  expect(ZERO).toBe( T.weeks(1).days(         ).days(1) - OF_8_DAYS);
  expect(ZERO).toBe( T.weeks(1).days(null     ).days(1) - OF_8_DAYS);
  expect(ZERO).toBe( T.weeks(1).days(undefined).days(1) - OF_8_DAYS);
});

// Implementation Assertions
it('static methods should produce instance of T', () => {
  expect(T.milliseconds(1)).toBeInstanceOf(T);
  expect(T.seconds(1)).toBeInstanceOf(T);
  expect(T.minutes(1)).toBeInstanceOf(T);
  expect(T.hours(1)).toBeInstanceOf(T);
  expect(T.days(1)).toBeInstanceOf(T);
  expect(T.weeks(1)).toBeInstanceOf(T);
});

// Implementation Assertions
it('instance methods should produce instance of T', () => {
  // The following produce type error
  // but should still be allowed in non-typescript environment

  // @ts-ignore
  expect(new T().milliseconds(1)).toBeInstanceOf(T);
  // @ts-ignore
  expect(new T().seconds(1)).toBeInstanceOf(T);
  // @ts-ignore
  expect(new T().minutes(1)).toBeInstanceOf(T);
  // @ts-ignore
  expect(new T().hours(1)).toBeInstanceOf(T);
  // @ts-ignore
  expect(new T().days(1)).toBeInstanceOf(T);
  // @ts-ignore
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
});
