import type { Period } from "..";
import { regex } from "./regex";

export const validator = {
  essential: { rule: (value: any) => !!value, message: "필수 항목입니다." },
  essentialPeriod: {
    rule: (value?: Period) => !!(value?.from && value?.to),
    message: "필수 항목입니다.",
  },
  essentialList: {
    rule: (value: any[] | undefined) => !!(value && 0 < value.length),
    message: "필수 항목입니다.",
  },
  maxNum: (maxNumber: number, onlyNaturalNum = true) => ({
    rule: (value = "") => {
      const numValue = Number(value);
      const underMaxNum = numValue <= maxNumber;
      return onlyNaturalNum ? 0 <= numValue && underMaxNum : underMaxNum;
    },
    message: `${maxNumber}보다 작은 값을 입력해주세요.`,
  }),
  maxChar: (maxLength: number) => ({
    rule: (value = "") => value.length <= maxLength,
    message: `${maxLength}자 이내로 입력해 주세요.`,
  }),
  emailRequired: {
    rule: (value?: string) => regex.email.test(String(value)),
    message: "올바른 이메일 주소를 입력해주세요.",
  },
  phoneRequired: {
    rule: (value?: string) => regex.phone.test(String(value)),
    message: "올바른 번호를 입력해주세요.",
  },
};
