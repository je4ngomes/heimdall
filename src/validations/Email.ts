import { IValidatorFunction } from "../@types/Validations";
import { voidFn } from "../utils/Voids";

// tslint:disable-next-line: max-line-length
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface RuleType {
  msg: string;
  rule: RegExp;
}

export type EmailOptions = IValidatorFunction & {
  domain?: RuleType;
  name?: RuleType;
};

const defaultDomain = {
  msg: "The domain of email is invalid",
  rule: /.*/,
};

const defaultName = {
  msg: "The name of email is invalid",
  rule: /.*/,
};

export default function Email(str: string, options?: EmailOptions) {
  const valid = regex.test(str);
  if (options) {
    const {
      domain = defaultDomain,
      msg = "Email invalid",
      name = defaultName,
      callback = voidFn,
      fallback = voidFn,
    } = options;
    const [emailName, emailDomain] = str.split("@");
    const testDomain = domain.rule.test(emailDomain);
    const nameDomain = name.rule.test(emailName);
    if (valid && testDomain && nameDomain) {
      callback(true, str);
      return [true, null];
    }
    const tests = [
      { key: "domain", msg: domain.msg, valid: testDomain },
      { key: "name", msg: name.msg, valid: nameDomain },
      { key: "default", msg, valid },
    ].filter((x) => !x.valid);
    fallback(false, tests);
    return [false, tests];
  }
  return [valid, null];
}
