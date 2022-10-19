import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalOpener } from './ModalOpener';
import type { ModalOpenerProps } from './ModalOpener';
import { File } from 'react-feather';
import React from 'react';

export default {
  title: 'molecules/ModalOpener',
  component: ModalOpener,
} as ComponentMeta<typeof ModalOpener>;

const ModalOpenerStory: ComponentStory<typeof ModalOpener> = (args) => <ModalOpener {...args} />;

export const Default = ModalOpenerStory.bind({});
const defaultArgs: ModalOpenerProps = {
  openerOptions: {
    children: 'OpenerContents',
    icon: File,
  },
  children: 'children',
  modalOptions: {
    title: 'title',
    buttonsOptions: [
      {
        theme: 'bluish-gray500',
        children: 'Button',
        onClick: (closeModal) => {
          closeModal();
        },
      },
    ],
  },
};
Default.args = defaultArgs;
