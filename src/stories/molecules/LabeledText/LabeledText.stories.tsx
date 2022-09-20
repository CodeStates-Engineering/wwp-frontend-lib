import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LabeledText } from "./LabeledText";
import React from "react";

export default {
  title: "molecules/LabeledText",
  component: LabeledText,
} as ComponentMeta<typeof LabeledText>;

const LabeledTextStory: ComponentStory<typeof LabeledText> = (args) => (
  <LabeledText {...args} />
);

export const Default = LabeledTextStory.bind({});
Default.args = {
  value: "LabeledText",
  id: "LabeledText",
  children: "LabeledText",
};
