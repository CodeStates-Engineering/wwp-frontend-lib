import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from '../Tooltip';
import React from 'react';
export default {
  title: 'atoms/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const TooltipStory: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = TooltipStory.bind({});
Default.args = {
  children: (
    <>
      툴팁 내용 예시 입니다.
      <br />
      툴팁 메시지가 들어갑니다.
    </>
  ),
};

Default.decorators = [
  (Story) => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '120px',
      }}
    >
      <Story />
    </div>
  ),
];
