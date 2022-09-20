import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConfirmModalOpener } from "./ConfirmModalOpener";
import React from "react";
export default {
  title: "organisms/ConfirmModalOpener",
  component: ConfirmModalOpener,
} as ComponentMeta<typeof ConfirmModalOpener>;

const ConfirmModalOpenerStory: ComponentStory<typeof ConfirmModalOpener> = (
  args
) => <ConfirmModalOpener {...args} />;

export const Default = ConfirmModalOpenerStory.bind({});
