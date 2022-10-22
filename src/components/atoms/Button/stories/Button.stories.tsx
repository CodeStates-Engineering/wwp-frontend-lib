import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { File } from 'react-feather';
import { Button } from '../Button';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonStory: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = ButtonStory.bind({});
Default.args = {
  children: 'Button',
  icon: File,
  disabled: false,
};
Default.decorators = [(Story) => <MemoryRouter initialEntries={['/']}>{Story()}</MemoryRouter>];
