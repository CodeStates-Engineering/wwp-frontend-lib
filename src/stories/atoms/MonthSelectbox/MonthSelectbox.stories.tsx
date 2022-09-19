import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MonthSelectbox } from "./MonthSelectbox";

export default {
  title: "atoms/MonthSelectbox",
  component: MonthSelectbox,
} as ComponentMeta<typeof MonthSelectbox>;

const MonthSelectboxStory: ComponentStory<typeof MonthSelectbox> = (args) => (
  <MonthSelectbox {...args} />
);

export const Default = MonthSelectboxStory.bind({});
