import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfirmModalOpener } from './ConfirmModalOpener';
import React from 'react';
import { Trash } from 'react-feather';

export default {
  title: 'organisms/ConfirmModalOpener',
  component: ConfirmModalOpener,
} as ComponentMeta<typeof ConfirmModalOpener>;

const ConfirmModalOpenerStory: ComponentStory<typeof ConfirmModalOpener> = (
  args,
) => (
  <ConfirmModalOpener {...args} />
);

export const Default = ConfirmModalOpenerStory.bind({});
Default.args = {
  openerType: 'button',
  modalType: 'left',
  openerContents: 'Confirm Modal Opener',
  title: 'Title',
  children: 'Content',
  confirmButtonContents: 'submit',
  confirmButtonTheme: 'wewin-blue600',
  size: 'medium',
  fontSize: 'medium',
  fontWeight: 'bold',
  maxWidth: '340px',
  contour: false,
  opened: false,
  closeButton: true,
};

export const Tag = ConfirmModalOpenerStory.bind({});
Tag.args = {
  openerType: 'tag',
  modalType: 'left',
  openerContents: 'Tag',
  title: 'Title',
  children: 'Content',
  confirmButtonContents: 'submit',
  confirmButtonTheme: 'wewin-blue600',
  size: 'medium',
  fontSize: 'medium',
  fontWeight: 'bold',
  maxWidth: '340px',
  contour: false,
  opened: false,
  closeButton: true,
};
Tag.decorators = [
  () => (
    <>
      <ConfirmModalOpener {...Tag.args} />
    </>
  ),
];

export const ExpandableButton = ConfirmModalOpenerStory.bind({});
ExpandableButton.args = {
  openerType: 'expandable-button',
  modalType: 'left',
  openerContents: 'Expandable Button',
  title: 'Title',
  children: 'Content',
  confirmButtonContents: 'submit',
  confirmButtonTheme: 'wewin-peach500',
  size: 'medium',
  fontSize: 'medium',
  fontWeight: 'bold',
  maxWidth: '340px',
  icon: Trash,
  contour: false,
  opened: false,
  closeButton: true,
};
ExpandableButton.decorators = [
  () => (
    <>
      <ConfirmModalOpener {...ExpandableButton.args} />
    </>
  ),
];