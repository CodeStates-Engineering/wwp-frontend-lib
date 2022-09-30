import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DrawerModal, DrawerModalProps } from "./DrawerModal";
import React from "react";

export default {
  title: "atoms/DrawerModal",
  component: DrawerModal,
} as ComponentMeta<typeof DrawerModal>;

const DrawerModalStory: ComponentStory<typeof DrawerModal> = (args) => (
  <DrawerModal {...args} />
);

const defaultArgs: DrawerModalProps = {
  opened: true,
  title: "제목 텍스트가 들어갑니다.",
  children: (
    <>
      <section>
        <p>첫번째 section 입니다.</p>
      </section>
      <section style={{ height: "100vh" }}>
        <p>두번째 section 입니다.</p>
      </section>
      <section>
        <p>세번째 section 입니다.</p>
      </section>
    </>
  ),
};

export const Default = DrawerModalStory.bind({});
Default.args = defaultArgs;
