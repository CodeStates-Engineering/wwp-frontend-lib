import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ComplexFileUpload } from "./ComplexInput";
import type { ComplexFileUploadProps } from "./ComplexInput";
import React from "react";

export default {
  title: "molecules/ComplexInput/ComplexFileUpload",
  component: ComplexFileUpload,
} as ComponentMeta<typeof ComplexFileUpload>;

const ComplexFileUploadStory: ComponentStory<typeof ComplexFileUpload> = (
  args
) => <ComplexFileUpload {...args} />;

export const Default = ComplexFileUploadStory.bind({});
const defaultArgs: ComplexFileUploadProps = {
  id: "라벨",
  children: "tooltip 내용이 들어갑니다.",
  disabled: false,
  instantUpload: false, //스토리북에서는 지원하지 않을 예정
  theme: "box",
  placeholder: "파일을 업로드해주세요.",
  accept: "image/*",
  url: "https://test",
};
Default.args = defaultArgs;
