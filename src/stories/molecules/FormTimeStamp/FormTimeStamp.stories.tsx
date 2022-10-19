import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormTimeStamp } from './FormTimeStamp';
import type { FormTimeStampProps } from './FormTimeStamp';
import React from 'react';

export default {
  title: 'molecules/FormTimeStamp',
  component: FormTimeStamp,
} as ComponentMeta<typeof FormTimeStamp>;

const FormEditStampStory: ComponentStory<typeof FormTimeStamp> = (args) => (
  <FormTimeStamp {...args} />
);

export const Default = FormEditStampStory.bind({});
const defaultArgs: FormTimeStampProps = {
  create: {
    time: new Date('2022-10-19'),
    author: 'system',
    isAdmin: true,
  },
  update: {
    time: new Date(),
    author: '이혁재',
  },
};
Default.args = defaultArgs;
