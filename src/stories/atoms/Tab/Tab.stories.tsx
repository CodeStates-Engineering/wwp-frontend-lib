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
    { label: "rootPage", path: "/" },
    { label: "page2", path: "/page2" },
    { label: "page3", path: "/page3" },
    { label: "page4", path: "/page4" },
  ],
};
Default.decorators = [
  (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
];
