import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexTextbox } from '../ComplexInput';
import type { ComplexTextboxProps } from '../ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexTextbox',
  component: ComplexTextbox,
} as ComponentMeta<typeof ComplexTextbox>;

const ComplexTextboxStory: ComponentStory<typeof ComplexTextbox> = (args) => (
  <ComplexTextbox {...args} />
);

export const Default = ComplexTextboxStory.bind({});
const defaultArgs: ComplexTextboxProps = {
  labelText: '라벨',
  essential: true,
};
Default.args = defaultArgs;

export const NumSeparatedByComma = ComplexTextboxStory.bind({});
const NumSeparatedByCommaArgs: ComplexTextboxProps = {
  labelText: '후불 납부 총액',
  essential: true,
  type: 'comma-separated-number',
  description: '후불 납부 총액을 입력해 주세요.',
  unit: '원',
};
NumSeparatedByComma.args = NumSeparatedByCommaArgs;
