export type SchemaValidation = [
  boolean,
  {
    [key: string]: [{ error: false; message: string }];
  }
];
