import { cleanClassName } from '../../../utils';
import { Label } from '../../atoms';
import type { LabelProps } from '../../atoms';
import scss from './FormGroup.module.scss';
import type React from 'react';

export interface FormGroupProps {
  type?: 'form' | 'section';
  children?: React.ReactNode;
  className?: string;
  padding?: boolean;
  backgroundColor?: 'gray';
  labelText?: LabelProps['children'];
  labelTextSize?: LabelProps['fontSize'];
  essential?: LabelProps['essential'];
  border?: boolean;
}

/**
 * @prop type - tag type
 * @prop children - 자식 컴포넌트
 * @prop className - 스타일시트 className
 * @prop padding - padding 여부
 * @prop backgroundColor - 배경색
 * @prop labelText - 라벨에 표시할 내용
 * @prop labelTextSize - 라벨 크기
 * @prop essential - 필수입력 여부
 * @prop border - border 여부
 */
export function FormGroup({
  type = 'form',
  children,
  className,
  padding = true,
  backgroundColor,
  labelText,
  labelTextSize = 'large2x',
  border = true,
  essential,
}: FormGroupProps) {
  const formProps = {
    className: cleanClassName(
      `${scss.form_container} ${scss['background_color_' + backgroundColor]} ${
        padding && scss.padding
      } ${border && scss.border} ${
        labelText && scss[`margin_padding_${labelTextSize}`]
      } ${className}`
    ),
    children,
  };

  return (
    <div>
      {labelText ? (
        <Label fontSize={labelTextSize} essential={essential} fontWeight="bold">
          {labelText}
        </Label>
      ) : undefined}
      {(() => {
        switch (type) {
          case 'form':
            return <form {...formProps} />;
          case 'section':
            return <section {...formProps} />;
        }
      })()}
    </div>
  );
}
