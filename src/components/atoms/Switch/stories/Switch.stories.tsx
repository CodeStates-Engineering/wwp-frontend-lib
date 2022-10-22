import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Switch } from '../Switch';
import type { SwitchProps } from '../Switch';

export default {
  title: 'atoms/Switch',
  component: Switch,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Switch>;

const SwitchStory: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = SwitchStory.bind({});
const defaultArgs: SwitchProps = {};
Default.args = defaultArgs;
