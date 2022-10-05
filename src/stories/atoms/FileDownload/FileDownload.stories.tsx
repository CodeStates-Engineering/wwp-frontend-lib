import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileDownload } from "./FileDownload";
import React from "react";

export default {
  title: "atoms/FileDownload",
  component: FileDownload,
} as ComponentMeta<typeof FileDownload>;

const HrStory: ComponentStory<typeof FileDownload> = (args) => (
  <FileDownload {...args} />
);

export const Default = HrStory.bind({});
Default.args = {
  fileUrl:
    "https://isa-platform-image.s3.ap-northeast-2.amazonaws.com/gongdangi/edu-admin-instructors.png",
};
