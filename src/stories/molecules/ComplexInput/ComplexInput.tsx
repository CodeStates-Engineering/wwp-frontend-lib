import scss from "./ComplexInput.module.scss";

import {
  Searchbox,
  Selectbox,
  Label,
  Tooltip,
  Textbox,
  Tagbox,
  Switch,
  MonthSelectbox,
  DateSelectbox,
  DateRangeSelectbox,
  Radiobox,
  Textarea,
  Checkbox,
  ValidationMessage,
} from "../../atoms";

import type {
  SearchboxProps,
  SelectboxProps,
  OptionHint,
  LabelProps,
  TextboxProps,
  TagboxProps,
  SwitchProps,
  MonthSelectboxProps,
  DateSelectboxProps,
  DateRangeSelectboxProps,
  TextareaProps,
  CheckboxProps,
  RadioboxProps,
} from "../../atoms";
import { useValidation } from "@hooks";
import { cleanClassName } from "@utils";
import type { Validation, ValidationStorage } from "@hooks";

type InputPropsHint =
  | TextboxProps
  | TagboxProps
  | SwitchProps
  | MonthSelectboxProps
  | DateSelectboxProps
  | DateRangeSelectboxProps
  | TextareaProps
  | CheckboxProps
  | RadioboxProps
  | SelectboxProps<OptionHint>
  | SearchboxProps<OptionHint>;

interface CommonProps<T extends InputPropsHint> {
  children?: React.ReactNode;
  label?: boolean;
  labelDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  labelText?: string;
  fitContainer?: boolean; //TODO: 추후 전체 컴포넌트에 적용 필요
  essential?: LabelProps["essential"];
  labelFontSize?: LabelProps["fontSize"];
  labelFontWeight?: LabelProps["fontWeight"];
  validationStorage?: ValidationStorage;
  validations?: Validation<T["value"]>[];
}

type InputComponentHint<T extends InputPropsHint> = (props: T) => JSX.Element;

function attachCommonProps<T extends InputPropsHint>(
  Input: InputComponentHint<T>
) {
  return ({
    id,
    children,
    label = true,
    labelDirection = "column",
    labelText,
    fitContainer,
    essential,
    labelFontSize,
    labelFontWeight,
    validationStorage,
    validations,
    onChange,
    ...restProps
  }: T & CommonProps<T>) => {
    const { checkValidation, validated, visableMessage } = useValidation(
      restProps.value,
      validations,
      id,
      validationStorage
    );

    const labelProps: LabelProps = {
      essential,
      htmlFor: id,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      children: labelText || id,
      id: id ? `${id}-label` : undefined,
    };

    const inputProps = {
      id,
      fitContainer,
      onChange: (value: never) => {
        onChange?.(value);
        checkValidation(value);
      },
      ...restProps,
    } as T;
    return (
      <div
        className={cleanClassName(
          `${scss.labeled_input_container} ${scss[labelDirection]} ${
            fitContainer && scss.fit_container
          }`
        )}
      >
        {label ? (
          <div className={scss.label_container}>
            <Label {...labelProps} />
            {children ? <Tooltip>{children}</Tooltip> : null}
          </div>
        ) : null}
        <div>
          <Input {...inputProps} />
          {validations ? (
            <ValidationMessage
              validated={validated}
              visableMessage={visableMessage}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

export type ComplexTextbox = TextboxProps & CommonProps<TextboxProps>;
export const ComplexTextbox = attachCommonProps(Textbox);

export type ComplexTagbox = TagboxProps & CommonProps<TagboxProps>;
export const ComplexTagbox = attachCommonProps(Tagbox);

export type ComplexSwitch = SwitchProps & CommonProps<SwitchProps>;
export const ComplexSwitch = attachCommonProps(Switch);

export type ComplexMonthSelectbox = MonthSelectboxProps &
  CommonProps<MonthSelectboxProps>;
export const ComplexMonthSelectbox = attachCommonProps(MonthSelectbox);

export type ComplexDateSelectbox = DateSelectboxProps &
  CommonProps<DateSelectboxProps>;
export const ComplexDateSelectbox = attachCommonProps(DateSelectbox);

export type ComplexDateRangeSelectbox = DateRangeSelectboxProps &
  CommonProps<DateRangeSelectboxProps>;
export const ComplexDateRangeSelectbox = attachCommonProps(DateRangeSelectbox);

export type ComplexRadiobox = RadioboxProps & CommonProps<RadioboxProps>;
export const ComplexRadiobox = attachCommonProps(Radiobox);

export type ComplexTextarea = TextareaProps & CommonProps<TextareaProps>;
export const ComplexTextarea = attachCommonProps(Textarea);

export type ComplexCheckbox = CheckboxProps & CommonProps<CheckboxProps>;
export const ComplexCheckbox = attachCommonProps(Checkbox);

export type ComplexSelectbox = SelectboxProps<OptionHint> &
  CommonProps<SelectboxProps<OptionHint>>;
export const ComplexSelectbox = attachCommonProps(Selectbox);

export type ComplexSearchbox = SearchboxProps<OptionHint> &
  CommonProps<SearchboxProps<OptionHint>>;
export const ComplexSearchbox = attachCommonProps(Searchbox);
