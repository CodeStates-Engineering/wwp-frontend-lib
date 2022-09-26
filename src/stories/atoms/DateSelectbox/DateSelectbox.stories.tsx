import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateSelectbox } from "./DateSelectbox";
import React from "react";
import { format } from "date-fns";
export default {
  title: "atoms/DateSelectbox",
  component: DateSelectbox,
} as ComponentMeta<typeof DateSelectbox>;

const DateSelectboxStory: ComponentStory<typeof DateSelectbox> = (args) => (
  <DateSelectbox {...args} />
);

export const Date = DateSelectboxStory.bind({});
Date.args = {};

export const DateRange = DateSelectboxStory.bind({});
DateRange.args = {
  type: "date-range",
  width: "400px",
  withTime: true,
  placeholder: {
    from: "시작날짜",
  },
  onChange: (value) => {
    const FORMAT = "yyyy-MM-dd HH:mm";
    value.from
      ? console.log(format(value.from, FORMAT))
      : console.log("from is null");
    value.to
      ? console.log(format(value.to, FORMAT))
      : console.log("to is null");
    console.log("--------------");
  },
};
