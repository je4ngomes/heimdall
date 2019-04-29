import Heimdall from "./heimdall";

export const schemaCompare = <T>(values: any, schema: T) => {
  return Object.keys(schema).map((x) => {
    const value = values[x];
    return {
      error: !!value,
      key: x,
      value,
    };
  });
};

const heimdall = Heimdall.New().Email({
  domain: {
    msg: "Foo error",
    rule: /foo\.com/,
  },
});

console.log(JSON.stringify(heimdall.Check("email.teste@email.com"), null, 4));
