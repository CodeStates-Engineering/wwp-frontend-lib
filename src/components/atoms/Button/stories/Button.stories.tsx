import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { File, X } from 'react-feather';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';

export default {
  title: 'atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonStory: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = ButtonStory.bind({});
const defaultArgs: ButtonProps = { children: 'Button', icon: File };
Default.args = defaultArgs;

export const BluishGray600 = ButtonStory.bind({});
const bluishGray600Args: ButtonProps = { ...defaultArgs, theme: 'bluish-gray600' };
BluishGray600.args = bluishGray600Args;

export const Outline = ButtonStory.bind({});
const outlineArgs: ButtonProps = {
  children: 'Button',
  icon: File,
  variant: 'outline',
  theme: 'bluish-gray500',
};
Outline.args = outlineArgs;

export const Icon = ButtonStory.bind({});
const iconArgs: ButtonProps = { icon: X, theme: 'bluish-gray500', shape: 'round', size: 'small' };
Icon.args = iconArgs;

export const Link = ButtonStory.bind({});
const linkArgs: ButtonProps = {
  children: 'Link Button',
  to: '/test',
  theme: 'bluish-gray600',
  variant: 'ghost',
};
Link.args = linkArgs;

export const Delay = ButtonStory.bind({});
const delayArgs: ButtonProps = { children: 'Delay Button', delay: 30000 };
Delay.args = delayArgs;
