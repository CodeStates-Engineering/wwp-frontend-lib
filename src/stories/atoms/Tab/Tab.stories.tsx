import type { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Tab } from "./Tab";
import { MemoryRouter } from "react-router-dom";
export default {
  title: "atoms/Tab",
  component: Tab,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tab>;

const SwitchStory: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = SwitchStory.bind({});
Default.args = {
  items: [
    { label: "rootPage", to: "/" },
    { label: "page2", to: "/page2" },
    { label: "page3", to: "/page3" },
    { label: "page4", to: "/page4" },
  ],
};
Default.decorators = [
  (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
];
