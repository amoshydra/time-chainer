// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types -- preserve support for boxed Number values
type T = number | Number | Time | null | undefined;
type N = number;

type TimeReturn = Time & number;

class Time extends Number {
  public readonly value: number;

  constructor(ms?: T) {
    const value = +(ms as number) || 0;
    super(value);
    this.value = value;
  }

  valueOf() {
    return this.value;
  }

  // Static methods
  static milliseconds(ms?: T) { return new Time(ms) as TimeReturn; }
  static seconds(s?: T) { return Time.milliseconds((s as N) * 1000) as TimeReturn; }
  static minutes(m?: T) { return Time.seconds((m as N) * 60) as TimeReturn; }
  static hours(h?: T) { return Time.minutes((h as N) * 60) as TimeReturn; }
  static days(d?: T) { return Time.hours((d as N) * 24) as TimeReturn; }
  static weeks(w?: T) { return Time.days((w as N) * 7) as TimeReturn; }

  // Instance methods
  milliseconds(ms?: T) {
    return new Time(this.value + Time.milliseconds(ms).value) as TimeReturn;
  }
  seconds(s?: T) {
    return new Time(this.value + Time.seconds(s).value) as TimeReturn;
  }
  minutes(m?: T) {
    return new Time(this.value + Time.minutes(m).value) as TimeReturn;
  }
  hours(h?: T) {
    return new Time(this.value + Time.hours(h).value) as TimeReturn;
  }
  days(d?: T) {
    return new Time(this.value + Time.days(d).value) as TimeReturn;
  }
  weeks(w?: T) {
    return new Time(this.value + Time.weeks(w).value) as TimeReturn;
  }
}

export default Time;
export { Time };
