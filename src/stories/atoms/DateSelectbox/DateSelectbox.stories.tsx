import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateSelectbox } from "./DateSelectbox";
import React from "react";
import { format } from "date-fns";
export default {
  title: "atoms/DateSelectbox",
  component: DateSelectbox,
} as ComponentMeta<typeof DateSelectbox>;

const DateSelectboxStory: ComponentStory<typeof DateSelectbox> = (args) => {
  return <DateSelectbox {...args} />;
};
export const Date = DateSelectboxStory.bind({});
Date.args = {
  type: "date-range",
};

export const DateRange = DateSelectboxStory.bind({});
DateRange.args = {};
