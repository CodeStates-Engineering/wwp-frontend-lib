import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ModalOpener } from "./ModalOpener";
import React from "react";

export default {
  title: "molecules/ModalOpener",
  component: ModalOpener,
} as ComponentMeta<typeof ModalOpener>;

const ModalOpenerStory: ComponentStory<typeof ModalOpener> = (args) => (
  <ModalOpener {...args} />
);

export const Default = ModalOpenerStory.bind({});
Default.args = {
  openerContents: "openerContents",
  title: "title",
  children: "children",
};
