export interface IValidatorFunction {
  msg?: string;
  callback?<T>(): T;
  fallback?<T>(): T;
}
