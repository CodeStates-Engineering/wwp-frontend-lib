import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Textbox } from "./Textbox";
import React from "react";

export default {
  title: "atoms/Textbox",
  component: Textbox,
} as ComponentMeta<typeof Textbox>;

const TextboxStory: ComponentStory<typeof Textbox> = (args) => (
  <Textbox {...args} />
);

export const Default = TextboxStory.bind({});
Default.args = {
  unit: "원",
};
