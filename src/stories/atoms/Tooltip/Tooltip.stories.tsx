import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tooltip } from "./Tooltip";

export default {
  title: "atoms/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const TooltipStory: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const Default = TooltipStory.bind({});
Default.args = {
  children: "툴팁 메시지가 들어갑니다.",
};
