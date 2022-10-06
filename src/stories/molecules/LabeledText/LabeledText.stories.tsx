import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LabeledText } from "./LabeledText";
import React from "react";

export default {
  title: "molecules/LabeledComponent/LabeledText",
  component: LabeledText,
} as ComponentMeta<typeof LabeledText>;

const LabeledTextStory: ComponentStory<typeof LabeledText> = (args) => (
  <LabeledText {...args} />
);

export const Default = LabeledTextStory.bind({});
Default.args = {
  value: "text 값이 들어갑니다.",
  id: "라벨",
  children: "tooltip 내용이 들어갑니다.",
};
