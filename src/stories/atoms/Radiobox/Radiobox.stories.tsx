import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Radiobox } from "./Radiobox";

export default {
  title: "atoms/Radiobox",
  component: Radiobox,
} as ComponentMeta<typeof Radiobox>;

const RadioboxStory: ComponentStory<typeof Radiobox> = (args) => (
  <Radiobox {...args} />
);

const options = [];

export const Default = RadioboxStory.bind({});
Default.args = {
  options: ["option1", "option2", "option3", "option4"],
};
