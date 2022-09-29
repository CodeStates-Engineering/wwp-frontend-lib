import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConfirmModalOpener } from "./ConfirmModalOpener";
import type { ConfirmModalOpenerProps } from "./ConfirmModalOpener";
import React from "react";
import { File } from "react-feather";

export default {
  title: "organisms/ConfirmModalOpener",
  component: ConfirmModalOpener,
} as ComponentMeta<typeof ConfirmModalOpener>;

const ConfirmModalOpenerStory: ComponentStory<typeof ConfirmModalOpener> = (
  args
) => <ConfirmModalOpener {...args} />;

export const Default = ConfirmModalOpenerStory.bind({});
const defaultArgs: ConfirmModalOpenerProps = {
  openerProps: {
    contents: "저장",
    icon: File,
  },
  confirmButtonProps: {
    children: "네, 저장합니다.",
    onClick: () => console.log("confirm"),
  },
  modalProps: {
    title: "저장 확인",
  },
  children: "정말로 저장하시겠습니까?",
};
Default.args = defaultArgs;
