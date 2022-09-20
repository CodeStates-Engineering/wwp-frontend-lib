import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CancelModalOpener } from "./CancelModalOpener";
import React from "react";

export default {
  title: "organisms/CancelModalOpener",
  component: CancelModalOpener,
} as ComponentMeta<typeof CancelModalOpener>;

const CancelModalOpenerStory: ComponentStory<typeof CancelModalOpener> = (
  args
) => <CancelModalOpener {...args} />;

export const Default = CancelModalOpenerStory.bind({});
