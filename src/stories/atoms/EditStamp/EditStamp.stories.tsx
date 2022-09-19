import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { EditStamp } from "./EditStamp";

export default {
  title: "atoms/EditStamp",
  component: EditStamp,
} as ComponentMeta<typeof EditStamp>;

const EditStampStory: ComponentStory<typeof EditStamp> = (args) => (
  <EditStamp {...args} />
);

export const Default = EditStampStory.bind({});
Default.args = {
  editType: "수정",
  editor: "system",
  editData: new Date(),
};
