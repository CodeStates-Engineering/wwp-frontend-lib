import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Modal } from "./Modal";

export default {
  title: "atoms/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const ModalStory: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = ModalStory.bind({});
Default.args = {
  opened: true,
  title: "모달 타이틀",
  explanation: "모달 설명",
  children: "모달 하위 컴포넌트가 들어갑니다.",
};
