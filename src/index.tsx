import './scss/global.scss';

//* Atom 컴포넌트
export {
  Button,
  Checkbox,
  DateSelectbox,
  TimeStamp,
  ExpandableButton,
  Hr,
  Label,
  Loading,
  Modal,
  MonthSelectbox,
  Pagination,
  Radiobox,
  Searchbox,
  SectionSlider,
  SectionSwitch,
  Selectbox,
  Switch,
  Tag,
  Tagbox,
  Textarea,
  Textbox,
  Tooltip,
  ValidationMessage,
  DrawerModal,
  Tab,
  FileDownload,
  FileUpload,
  Progress,
} from './components/atoms';
export type {
  ButtonProps,
  CheckboxProps,
  DateSelectboxProps,
  DateType,
  Period,
  TimeStampProps,
  ExpandableButtonProps,
  HrProps,
  LabelProps,
  LoadingProps,
  ModalProps,
  MonthSelectboxProps,
  MonthDate,
  PaginationProps,
  RadioboxProps,
  SearchboxProps,
  SectionMoveButtonProps,
  SectionSliderContainerProps,
  SectionSliderItemProps,
  SectionSwitchContainerProps,
  SectionSwitchItemProps,
  SelectboxProps,
  SwitchProps,
  TagProps,
  TagboxProps,
  TextareaProps,
  TextboxProps,
  TooltipProps,
  ValidationMessageProps,
  DrawerModalProps,
  TabProps,
  FileDownloadProps,
  FileUploadProps,
  WebFile,
  ProgressProps,
} from './components/atoms';

//* Molecule 컴포넌트
export {
  Chip,
  ComplexCheckbox,
  ComplexDateSelectbox,
  ComplexMonthSelectbox,
  ComplexRadiobox,
  ComplexSelectbox,
  ComplexSwitch,
  ComplexTextbox,
  ComplexTextarea,
  ComplexTagbox,
  ComplexSearchbox,
  ComplexFileUpload,
  FormTimeStamp,
  FormGroup,
  ModalOpener,
  DrawerModalOpener,
  PageContents,
  PaginationWithPageSize,
  Table,
  ComplexFileDownload,
} from './components/molecules';
export type {
  ComplexCheckboxProps,
  ComplexDateSelectboxProps,
  ComplexMonthSelectboxProps,
  ComplexRadioboxProps,
  ComplexSearchboxProps,
  ComplexSelectboxProps,
  ComplexSwitchProps,
  ComplexTagboxProps,
  ComplexTextareaProps,
  ComplexTextboxProps,
  ComplexFileUploadProps,
  FormTimeStampProps,
  PaginationWithPageSizeProps,
  TableBodyProps,
  TableHeadProps,
  TableRowProps,
  TableContainerProps,
  TableDataProps,
  TableTitleProps,
  ModalOpenerProps,
  DrawerModalOpenerProps,
  PageContentsContainerProps,
  PageContentsHeaderProps,
  PageContentsSectionProps,
  FormGroupProps,
  ChipProps,
  ComplexFileDownloadProps,
} from './components/molecules';

//* Organism 컴포넌트
export { ConfirmModalOpener, CancelModalOpener, DeleteModalOpener } from './components/organisms';
export type {
  ConfirmModalOpenerProps,
  CancelModalOpenerProps,
  DeleteModalOpenerProps,
} from './components/organisms';

//* Util 함수
export {
  validator,
  cleanClassName,
  copyText,
  undefinable,
  regex,
  checkStringDate,
  getExtension,
  uploadFile,
  createConvenienceObject,
} from './utils';

//* Hook 함수

import {
  useOpenedStateWithCloseExternalClick,
  useParentState,
  createPaginationState,
  useDebouncedValue,
  useDebouncedFunction,
  useValidationStorage,
  useValidation,
  useDepsState,
  assignTypeToPropsStore,
  getPropsStore,
  useMountedEffect,
} from './hooks';

export type {
  OpenedStateWithCloseExternalClick,
  PaginationState,
  ValidationStorage,
  Validation,
} from './hooks';

export {
  useOpenedStateWithCloseExternalClick,
  useParentState,
  createPaginationState,
  useDebouncedValue,
  useDebouncedFunction,
  useValidationStorage,
  useValidation,
  useDepsState,
  assignTypeToPropsStore,
  getPropsStore,
  useMountedEffect,
};

export namespace Hooks {
  useOpenedStateWithCloseExternalClick;
  useParentState;
  createPaginationState;
  useDebouncedValue;
  useDebouncedFunction;
  useValidationStorage;
  useValidation;
  useDepsState;
  assignTypeToPropsStore;
  getPropsStore;
  useMountedEffect;
}
