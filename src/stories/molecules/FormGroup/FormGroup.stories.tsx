import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormGroup } from "./FormGroup";
import React from "react";

export default {
  title: "molecules/FormGroup",
  component: FormGroup,
} as ComponentMeta<typeof FormGroup>;

const FormGroupStory: ComponentStory<typeof FormGroup> = (args) => (
  <FormGroup {...args} />
);

export const Default = FormGroupStory.bind({});
