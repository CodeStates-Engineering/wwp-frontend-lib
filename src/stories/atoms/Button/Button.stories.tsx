import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { File } from "react-feather";
import { Button } from "./Button";

export default {
  title: "atoms/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonStory: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Default = ButtonStory.bind({});
Default.args = {
  children: "Button",
  icon: File,
};
