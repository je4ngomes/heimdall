import Email, { EmailOptions } from "../validations/Email";

export default class Heimdall {
  public static New() {
    return new Heimdall();
  }

  private validations: Function[];
  private values?: any;

  constructor(values?: any) {
    this.validations = [];
    this.values = values;
  }

  public Email(options?: EmailOptions) {
    return this.includeValidation(Email, options);
  }

  public Check(value: any) {
    if (this.values === null || this.values === undefined) {
      if (value === null || value === undefined) {
        return [false, new Error("HeimdallError, not values to test")];
      }
    }
    const arr = this.validations.map((x) => x(value)).filter((x) => !x[0]);
    if (arr.length === 0) {
      return [true, null];
    }
    return [false, arr];
  }

  public Validations() {
    return [...this.validations];
  }

  private includeValidation(fn: any, options?: any) {
    this.validations.push((value: string) => fn(value, options));
    return this;
  }
}
