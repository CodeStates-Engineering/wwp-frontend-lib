import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DateRangeSelectbox } from "./DateRangeSelectbox";

export default {
  title: "atoms/DateRangeSelectbox",
  component: DateRangeSelectbox,
} as ComponentMeta<typeof DateRangeSelectbox>;

const DateRangeSelectboxStory: ComponentStory<typeof DateRangeSelectbox> = (
  args
) => <DateRangeSelectbox {...args} />;

export const Default = DateRangeSelectboxStory.bind({});
