import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal, ModalProps } from '../Modal';
import React from 'react';

export default {
  title: 'molecules/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const ModalStory: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const commonArgs: ModalProps = {
  opened: true,
  title: '제목 텍스트가 들어갑니다.',
  subText: '서브 텍스트가 들어갑니다.',
  children: '콘텐츠 영역(커스텀)',
  modalType: 'left',
  contour: true,
  buttonsOptions: [
    {
      theme: 'bluish-gray500',
      children: 'Button',
      onClick: (closeModal) => {
        closeModal();
      },
    },
    { children: 'Button' },
  ],
};

export const Default = ModalStory.bind({});
Default.args = commonArgs;
