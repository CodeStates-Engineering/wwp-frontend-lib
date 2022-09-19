import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Switch } from "./Switch";

export default {
  title: "atoms/Switch",
  component: Switch,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Switch>;

const SwitchStory: ComponentStory<typeof Switch> = (args) => (
  <Switch {...args} />
);

export const Default = SwitchStory.bind({});
