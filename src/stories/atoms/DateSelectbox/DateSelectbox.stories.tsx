import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateSelectbox } from "./DateSelectbox";

export default {
  title: "atoms/DateSelectbox",
  component: DateSelectbox,
} as ComponentMeta<typeof DateSelectbox>;

const DateSelectboxStory: ComponentStory<typeof DateSelectbox> = (args) => (
  <DateSelectbox {...args} />
);

export const Default = DateSelectboxStory.bind({});
