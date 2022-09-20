import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComplexDateRangeSelectbox } from "./ComplexInput";
import React from "react";

export default {
  title: "molecules/ComplexInput/ComplexDateRangeSelectbox",
  component: ComplexDateRangeSelectbox,
} as ComponentMeta<typeof ComplexDateRangeSelectbox>;

const ComplexDateRangeSelectboxStory: ComponentStory<
  typeof ComplexDateRangeSelectbox
> = (args) => <ComplexDateRangeSelectbox {...args} />;

export const Default = ComplexDateRangeSelectboxStory.bind({});
Default.args = {
  labelText: "라벨",
};
