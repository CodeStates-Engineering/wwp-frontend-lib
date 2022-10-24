import scss from './ComplexInput.module.scss';
import { useCallback } from 'react';
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
  FileDownload,
  InputDescription,
} from '../../atoms';

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
  RadioboxOptionHint,
  RadioboxProps,
  FileUploadProps,
  FileDownloadProps,
  InputDescriptionProps,
} from '../../atoms';
import { useValidation } from '../../../hooks';
import { cleanClassName } from '../../../utils';
import type { ValidationStorage } from '../../../hooks';

type InputPropsHint =
  | TextboxProps
  | TagboxProps
  | SwitchProps
  | MonthSelectboxProps
  | DateSelectboxProps<'date' | 'date-range'>
  | TextareaProps
  | CheckboxProps
  | RadioboxProps<RadioboxOptionHint>
  | SelectboxProps<OptionHint>
  | SearchboxProps<OptionHint>
  | FileUploadProps
  | FileDownloadProps;

interface CommonProps<T extends InputPropsHint> {
  children?: React.ReactNode;
  label?: boolean;
  labelDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  labelText?: string;
  essential?: LabelProps['essential'];
  addEssentialValidation?: boolean;
  labelFontSize?: LabelProps['fontSize'];
  labelFontWeight?: LabelProps['fontWeight'];
  validationStorage?: ValidationStorage;
  validation?: (value: Parameters<Exclude<T['onChange'], undefined>>[0]) => string | undefined;
  width?: React.CSSProperties['width'];
  inputWidth?: React.CSSProperties['width'];
  justifyContent?: React.CSSProperties['justifyContent'];
  minHeight?: React.CSSProperties['minHeight'];
  description?: React.ReactNode;
}

type InputComponentHint<T extends InputPropsHint> = (props: T) => JSX.Element;

function attachCommonProps<T extends InputPropsHint>(Input: InputComponentHint<T>) {
  return ({
    id,
    children,
    label = true,
    labelDirection = 'column',
    labelText,
    essential,
    addEssentialValidation = true,
    labelFontSize,
    labelFontWeight,
    validationStorage,
    validation,
    onChange,
    width = 'fit-content',
    inputWidth = '246px',
    justifyContent = 'flex-start',
    minHeight,
    value,
    description,
    ...restProps
  }: T & CommonProps<T>) => {
    const _validation = useCallback((value: any) => {
      const ESSENTIAL_MESSAGE = '필수 항목입니다.';
      if (addEssentialValidation && essential) {
        switch (typeof value) {
          case 'object':
            if (Array.isArray(value) && value.length === 0) return ESSENTIAL_MESSAGE;
            else for (const key in value) if (value[key] === undefined) return ESSENTIAL_MESSAGE;
            break;
          default:
            if (value === undefined || value === '') return ESSENTIAL_MESSAGE;
        }
      }
      return validation?.(value);
    }, []);

    const { checkValidation, message, invalid } = useValidation(
      value,
      _validation,
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
      value,
      width: inputWidth,
      onChange: (value: never) => {
        onChange?.(value);
        checkValidation(value);
      },
      invalid,
      ...restProps,
    };

    const isDescriptionExist = !!description;

    return (
      <div style={{ width, minHeight }} className={scss.complex_input_container}>
        <div
          style={{ justifyContent }}
          className={cleanClassName(`${scss.labeled_input_container} ${scss[labelDirection]}`)}
        >
          {label && (labelText || id) ? (
            <div className={scss.label_container}>
              <Label {...labelProps} />
              {children ? <Tooltip>{children}</Tooltip> : null}
            </div>
          ) : null}
          <Input {...inputProps} />
        </div>
        {(((validation || essential) && addEssentialValidation) || isDescriptionExist) && (
          <InputDescription
            visible={isDescriptionExist || invalid}
            theme={invalid ? 'error' : 'default'}
          >
            {message || description}
          </InputDescription>
        )}
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

export type ComplexMonthSelectboxProps = MonthSelectboxProps & CommonProps<MonthSelectboxProps>;
export const ComplexMonthSelectbox = attachCommonProps(MonthSelectbox);

export type ComplexDateSelectboxProps<T extends DateType = 'date'> = DateSelectboxProps<T> &
  CommonProps<DateSelectboxProps<T>>;
export const ComplexDateSelectbox = attachCommonProps(DateSelectbox);

export type ComplexRadioboxProps = RadioboxProps<RadioboxOptionHint> &
  CommonProps<RadioboxProps<RadioboxOptionHint>>;
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

export type ComplexFileUploadProps = FileUploadProps & CommonProps<FileUploadProps>;
export const ComplexFileUpload = attachCommonProps(FileUpload);

export type ComplexFileDownloadProps = FileDownloadProps & CommonProps<FileDownloadProps>;
export const ComplexFileDownload = attachCommonProps(FileDownload);
