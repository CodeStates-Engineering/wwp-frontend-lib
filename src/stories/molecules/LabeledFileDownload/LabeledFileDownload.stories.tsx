import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { LabeledFileDownload } from "./LabeledFileDownload";
import type { LabeledFileDownloadProps } from "./LabeledFileDownload";
import React from "react";

export default {
  title: "molecules/LabeledComponent/LabeledFileDownload",
  component: LabeledFileDownload,
} as ComponentMeta<typeof LabeledFileDownload>;

const HrStory: ComponentStory<typeof LabeledFileDownload> = (args) => (
  <LabeledFileDownload {...args} />
);

export const Default = HrStory.bind({});
const defaultArgs: LabeledFileDownloadProps = {
  id: "라벨",
  children: "tooltip 내용이 들어갑니다.",
  fileUrl:
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
};
Default.args = defaultArgs;
