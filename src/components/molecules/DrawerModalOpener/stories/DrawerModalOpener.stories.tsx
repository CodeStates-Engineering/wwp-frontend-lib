import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DrawerModalOpener } from '../DrawerModalOpener';
import type { DrawerModalOpenerProps } from '../DrawerModalOpener';
import { File } from 'react-feather';
import React from 'react';

export default {
  title: 'molecules/DrawerModalOpener',
  component: DrawerModalOpener,
} as ComponentMeta<typeof DrawerModalOpener>;

const DrawerModalOpenerStory: ComponentStory<typeof DrawerModalOpener> = (args) => (
  <DrawerModalOpener {...args} />
);

export const Default = DrawerModalOpenerStory.bind({});
const defaultArgs: DrawerModalOpenerProps = {
  openerOptions: {
    children: 'OpenerContents',
    icon: File,
  },
  children: (
    <>
      <section>
        <p>첫번째 section 입니다.</p>
      </section>
      <section style={{ height: '100vh' }}>
        <p>두번째 section 입니다.</p>
      </section>
      <section>
        <p>세번째 section 입니다.</p>
      </section>
    </>
  ),
  modalOptions: {
    title: '제목 텍스트가 들어갑니다.',
  },
};
Default.args = defaultArgs;
