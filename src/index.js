export default class Time extends Number {
  constructor(ms) {
    super();
    this.value = ms || 0;
  }
  valueOf() {
    return this.value;
  }
  toString() {
    return this.value;
  }

  // Static methods
  static milliseconds(ms) { return new Time(ms); }
  static seconds(s) { return Time.milliseconds(s * 1000); }
  static minutes(m) { return Time.seconds(m * 60); }
  static hours(h) { return Time.minutes(h * 60); }
  static days(d) { return Time.hours(d * 24); }
  static weeks(w) { return Time.days(w * 7); }

  // Instance methods
  milliseconds(ms) {
    this.value += Time.milliseconds(ms);
    return this;
  }
  seconds(s) {
    this.value += Time.seconds(s);
    return this;
  }
  minutes(m) {
    this.value += Time.minutes(m);
    return this;
  }
  hours(h) {
    this.value += Time.hours(h);
    return this;
  }
  days(d) {
    this.value += Time.days(d);
    return this;
  }
  weeks(w) {
    this.value += Time.weeks(w);
    return this;
  }
}
