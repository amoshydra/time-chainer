import test from 'ava';
import T from '../src';

const ZERO = 0;

// Usage testing
test('should output correct value with its static method', t => {
  t.is(ZERO, T.milliseconds(1) - (1));
  t.is(ZERO,      T.seconds(1) - (1000));
  t.is(ZERO,      T.minutes(1) - (60 * 1000));
  t.is(ZERO,        T.hours(1) - (60 * 60 * 1000));
  t.is(ZERO,         T.days(1) - (24 * 60 * 60 * 1000));
  t.is(ZERO,        T.weeks(1) - (7 * 24 * 60 * 60 * 1000));
});

test('should output 0 when 0 is given as param', t => {
  t.is(ZERO, T.milliseconds(0) - ZERO);
  t.is(ZERO,      T.seconds(0) - ZERO);
  t.is(ZERO,      T.minutes(0) - ZERO);
  t.is(ZERO,        T.hours(0) - ZERO);
  t.is(ZERO,         T.days(0) - ZERO);
  t.is(ZERO,        T.weeks(0) - ZERO);
});

test('should output 0 when nothing is given as param', t => {
  t.is(ZERO, T.milliseconds() - ZERO);
  t.is(ZERO,      T.seconds() - ZERO);
  t.is(ZERO,      T.minutes() - ZERO);
  t.is(ZERO,        T.hours() - ZERO);
  t.is(ZERO,         T.days() - ZERO);
  t.is(ZERO,        T.weeks() - ZERO);

  t.is(ZERO, T.milliseconds(undefined) - ZERO);
  t.is(ZERO,      T.seconds(undefined) - ZERO);
  t.is(ZERO,      T.minutes(undefined) - ZERO);
  t.is(ZERO,        T.hours(undefined) - ZERO);
  t.is(ZERO,         T.days(undefined) - ZERO);
  t.is(ZERO,        T.weeks(undefined) - ZERO);

  t.is(ZERO, T.milliseconds(null) - ZERO);
  t.is(ZERO,      T.seconds(null) - ZERO);
  t.is(ZERO,      T.minutes(null) - ZERO);
  t.is(ZERO,        T.hours(null) - ZERO);
  t.is(ZERO,         T.days(null) - ZERO);
  t.is(ZERO,        T.weeks(null) - ZERO);
});

test('should work with chaining', t => {
  const OF_8_DAYS = (8 * (24 * 60 * 60 * 1000));

  t.is(ZERO, T.weeks(1).days(1) - OF_8_DAYS);
});

test('should allow 0 or nothing during chaining', t => {
  const OF_8_DAYS = (8 * (24 * 60 * 60 * 1000));

  t.is(ZERO, T.weeks(1).days(0        ).days(1) - OF_8_DAYS);
  t.is(ZERO, T.weeks(1).days(         ).days(1) - OF_8_DAYS);
  t.is(ZERO, T.weeks(1).days(null     ).days(1) - OF_8_DAYS);
  t.is(ZERO, T.weeks(1).days(undefined).days(1) - OF_8_DAYS);
});

// Implementation Assertions
test('static methods should produce instance of T', t => {
  t.true(T.milliseconds(1) instanceof T);
  t.true(T.seconds(1) instanceof T);
  t.true(T.minutes(1) instanceof T);
  t.true(T.hours(1) instanceof T);
  t.true(T.days(1) instanceof T);
  t.true(T.weeks(1) instanceof T);
});

// Implementation Assertions
test('instance methods should produce instance of T', t => {
  t.true(new T().milliseconds(1) instanceof T);
  t.true(new T().seconds(1) instanceof T);
  t.true(new T().minutes(1) instanceof T);
  t.true(new T().hours(1) instanceof T);
  t.true(new T().days(1) instanceof T);
  t.true(new T().weeks(1) instanceof T);
});

// Type coercion
test('stringification should produce number string', t => {
  t.is(
    JSON.stringify({
      time: T.seconds(0),
    }),
    JSON.stringify({
      time: 0,
    })
  );

  t.not(
    JSON.stringify({
      time: T.seconds(0),
    }),
    JSON.stringify({
      time: '0',
    })
  );
});
