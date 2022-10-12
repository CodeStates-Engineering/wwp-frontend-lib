import scss from './ComplexInput.module.scss';
import { useMemo } from 'react';
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
  ValidationMessage,
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
} from '../../atoms';
import { useValidation } from '@hooks';
import { cleanClassName } from '@utils';
import type { Validation, ValidationStorage } from '@hooks';

type InputPropsHint =
  | TextboxProps
  | TagboxProps
  | SwitchProps
  | MonthSelectboxProps
  | DateSelectboxProps<'date' | 'date-range'>
  | TextareaProps
  | CheckboxProps
  | RadioboxProps<OptionHint>
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
  validations?: Validation<T['value']>[];
  width?: React.CSSProperties['width'];
  inputWidth?: React.CSSProperties['width'];
  justifyContent?: React.CSSProperties['justifyContent'];
  minHeight?: React.CSSProperties['minHeight'];
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
    validations,
    onChange,
    width = 'fit-content',
    inputWidth = '246px',
    justifyContent = 'flex-start',
    minHeight,
    value,
    ...restProps
  }: T & CommonProps<T>) => {
    const _validations = useMemo(() => {
      return essential && addEssentialValidation
        ? [
            {
              rule: (value: any) => {
                switch (typeof value) {
                  case 'object':
                    for (const key in value) if (value[key] === undefined) return false;
                    return true;
                  default:
                    return value === undefined || value === '' ? false : true;
                }
              },
              message: '필수 항목입니다.',
            },
            ...(validations ?? []),
          ]
        : validations;
    }, [validations, essential, addEssentialValidation]);

    const { checkValidation, validated, visableMessage } = useValidation(
      value,
      _validations,
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
      width: '100%',
      onChange: (value: never) => {
        onChange?.(value);
        checkValidation(value);
      },
      ...restProps,
    };

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
        {_validations ? (
          <ValidationMessage validated={validated} visableMessage={visableMessage} />
        ) : null}
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
