import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComplexSelectbox } from "./ComplexInput";
import React from "react";

export default {
  title: "molecules/ComplexInput/ComplexSelectbox",
  component: ComplexSelectbox,
} as ComponentMeta<typeof ComplexSelectbox>;

const ComplexSelectboxStory: ComponentStory<typeof ComplexSelectbox> = (
  args
) => <ComplexSelectbox {...args} />;

export const Default = ComplexSelectboxStory.bind({});
Default.args = {
  labelText: "라벨",
};
