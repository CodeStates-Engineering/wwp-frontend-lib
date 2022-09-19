import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  title: "atoms/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const CheckboxStory: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = CheckboxStory.bind({});
