type T = number | Number | Time | null | undefined;
type N = number;

type TimeReturn = Time & number;

class Time extends Number {
  public value = 0;

  constructor(ms?: T) {
    super(ms);
    this.value = +(ms as number) || 0;
  }

  valueOf() {
    return this.value as number;
  }

  // Static methods
  static milliseconds(ms?: T) { return new Time(ms) as TimeReturn; }
  static seconds(s?: T) { return Time.milliseconds(s as N * 1000) as TimeReturn; }
  static minutes(m?: T) { return Time.seconds(m as N * 60) as TimeReturn; }
  static hours(h?: T) { return Time.minutes(h as N * 60) as TimeReturn; }
  static days(d?: T) { return Time.hours(d as N * 24) as TimeReturn; }
  static weeks(w?: T) { return Time.days(w as N * 7) as TimeReturn; }

  // Instance methods
  milliseconds(ms?: T) {
    this.value += Time.milliseconds(ms).value;
    return this as unknown as TimeReturn;
  }
  seconds(s?: T) {
    this.value += Time.seconds(s).value;
    return this as unknown as TimeReturn;
  }
  minutes(m?: T) {
    this.value += Time.minutes(m).value;
    return this as unknown as TimeReturn;
  }
  hours(h?: T) {
    this.value += Time.hours(h).value;
    return this as unknown as TimeReturn;
  }
  days(d?: T) {
    this.value += Time.days(d).value;
    return this as unknown as TimeReturn;
  }
  weeks(w?: T) {
    this.value += Time.weeks(w).value;
    return this as unknown as TimeReturn;
  }
}

const TimeReturn = Time as unknown as TimeReturn;

export default TimeReturn;
export { TimeReturn as Time };
