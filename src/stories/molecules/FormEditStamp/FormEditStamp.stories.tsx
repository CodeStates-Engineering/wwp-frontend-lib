import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormEditStamp } from './FormEditStamp';
import React from 'react';

export default {
  title: 'molecules/FormEditStamp',
  component: FormEditStamp,
} as ComponentMeta<typeof FormEditStamp>;

const FormEditStampStory: ComponentStory<typeof FormEditStamp> = (args) => (
  <FormEditStamp {...args} />
);

export const Default = FormEditStampStory.bind({});
Default.args = {
  edit: {
    editDate: new Date(),
    editor: '이혁재',
  },
  regist: {
    editDate: new Date(),
    editor: 'system',
  },
};
