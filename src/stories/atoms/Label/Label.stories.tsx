import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Label } from "./Label";

export default {
  title: "atoms/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const LabelStory: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Default = LabelStory.bind({});
Default.args = {
  children: "라벨",
};
