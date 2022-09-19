import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Hr } from "./Hr";

export default {
  title: "atoms/Hr",
  component: Hr,
} as ComponentMeta<typeof Hr>;

const HrStory: ComponentStory<typeof Hr> = (args) => <Hr {...args} />;

export const Default = HrStory.bind({});
Default.decorators = [
  (Story) => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Story />
    </div>
  ),
];
