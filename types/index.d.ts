type TimeReturn = Time & number;

export default class Time extends Number {
  static milliseconds(ms: number): TimeReturn
  static seconds(s: number): TimeReturn
  static minutes(m: number): TimeReturn
  static hours(h: number): TimeReturn
  static days(d: number): TimeReturn
  static weeks(w: number): TimeReturn

  milliseconds(ms: number): TimeReturn
  seconds(s: number): TimeReturn
  minutes(m: number): TimeReturn
  hours(h: number): TimeReturn
  days(d: number): TimeReturn
  weeks(w: number): TimeReturn
}
