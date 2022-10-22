import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { OptionHint, Selectbox } from '../Selectbox';
import type { SelectboxProps } from '../Selectbox';
import React from 'react';
export default {
  title: 'atoms/Selectbox',
  component: Selectbox,
} as ComponentMeta<typeof Selectbox>;

const SelectboxStory: ComponentStory<typeof Selectbox> = (args: SelectboxProps<any>) => (
  <Selectbox {...args} />
);

export const StringOptions = SelectboxStory.bind({});
const stringOptions: string[] = [];
for (let i = 1; i <= 20; i++) stringOptions.push(`Selectbox Option ${i}`);
StringOptions.args = {
  placeholder: 'Selectbox Placeholder',
  options: stringOptions,
};

export const ObjectOptions = SelectboxStory.bind({});
const objectOptions: { label: string; value: number }[] = [];
for (let i = 1; i <= 20; i++) {
  objectOptions.push({
    label: `Selectbox Option ${i}`,
    value: i,
  });
}

ObjectOptions.args = {
  placeholder: 'Selectbox Placeholder',
  optionsIncludePlaceholder: true,
  options: objectOptions,
};
