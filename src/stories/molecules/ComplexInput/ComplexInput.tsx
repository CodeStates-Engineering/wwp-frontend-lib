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
  Radiobox,
  Textarea,
  Checkbox,
  FileUpload,
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
  DateType,
  TextareaProps,
  CheckboxProps,
  RadioboxProps,
  FileUploadProps,
} from "../../atoms";
import { useValidation } from "@hooks";
import { cleanClassName } from "@utils";
import type { Validation, ValidationStorage } from "@hooks";

type InputPropsHint =
  | TextboxProps
  | TagboxProps
  | SwitchProps
  | MonthSelectboxProps
  | DateSelectboxProps<"date" | "date-range">
  | TextareaProps
  | CheckboxProps
  | RadioboxProps
  | SelectboxProps<OptionHint>
  | SearchboxProps<OptionHint>
  | FileUploadProps;

interface CommonProps<T extends InputPropsHint> {
  children?: React.ReactNode;
  label?: boolean;
  labelDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  labelText?: string;
  essential?: LabelProps["essential"];
  labelFontSize?: LabelProps["fontSize"];
  labelFontWeight?: LabelProps["fontWeight"];
  validationStorage?: ValidationStorage;
  validations?: Validation<T["value"]>[];
  width?: React.CSSProperties["width"];
  inputWidth?: React.CSSProperties["width"];
  justifyContent?: React.CSSProperties["justifyContent"];
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
    essential,
    labelFontSize,
    labelFontWeight,
    validationStorage,
    validations,
    onChange,
    width = "246px",
    inputWidth = "100%",
    justifyContent = "flex-start",
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

    const inputProps: any = {
      id,
      width: "100%",
      onChange: (value: never) => {
        onChange?.(value);
        checkValidation(value);
      },
      ...restProps,
    };

    return (
      <div
        className={cleanClassName(
          `${scss.labeled_input_container} ${scss[labelDirection]}`
        )}
        style={{ width, justifyContent }}
      >
        {label ? (
          <div className={scss.label_container}>
            <Label {...labelProps} />
            {children ? <Tooltip>{children}</Tooltip> : null}
          </div>
        ) : null}
        <div style={{ width: inputWidth }}>
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

export type ComplexTextboxProps = TextboxProps & CommonProps<TextboxProps>;
export const ComplexTextbox = attachCommonProps(Textbox);

export type ComplexTagboxProps = TagboxProps & CommonProps<TagboxProps>;
export const ComplexTagbox = attachCommonProps(Tagbox);

export type ComplexSwitchProps = SwitchProps & CommonProps<SwitchProps>;
export const ComplexSwitch = attachCommonProps(Switch);

export type ComplexMonthSelectboxProps = MonthSelectboxProps &
  CommonProps<MonthSelectboxProps>;
export const ComplexMonthSelectbox = attachCommonProps(MonthSelectbox);

export type ComplexDateSelectboxProps<T extends DateType = "date"> =
  DateSelectboxProps<T> & CommonProps<DateSelectboxProps<T>>;
export const ComplexDateSelectbox = attachCommonProps(DateSelectbox);

export type ComplexRadioboxProps = RadioboxProps & CommonProps<RadioboxProps>;
export const ComplexRadiobox = attachCommonProps(Radiobox);

export type ComplexTextareaProps = TextareaProps & CommonProps<TextareaProps>;
export const ComplexTextarea = attachCommonProps(Textarea);

export type ComplexCheckboxProps = CheckboxProps & CommonProps<CheckboxProps>;
export const ComplexCheckbox = attachCommonProps(Checkbox);

export type ComplexSelectboxProps = SelectboxProps<OptionHint> &
  CommonProps<SelectboxProps<OptionHint>>;
export const ComplexSelectbox = attachCommonProps(Selectbox);

export type ComplexSearchboxProps = SearchboxProps<OptionHint> &
  CommonProps<SearchboxProps<OptionHint>>;
export const ComplexSearchbox = attachCommonProps(Searchbox);

export type ComplexFileUploadProps = FileUploadProps &
  CommonProps<FileUploadProps>;
export const ComplexFileUpload = attachCommonProps(FileUpload);
