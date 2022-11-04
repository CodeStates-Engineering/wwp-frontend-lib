import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToastLayout } from '../ToastLayout';
import { Button } from '../../../atoms/Button/Button';
import { useToast, useToastLayoutStore } from '../../../../hooks/useToast';
import React, { useState } from 'react';
export default {
  title: 'molecules/ToastLayout',
  component: ToastLayout,
} as ComponentMeta<typeof ToastLayout>;

const ToastLayoutStory: ComponentStory<typeof ToastLayout> = (args) => <ToastLayout {...args} />;

export const Default = ToastLayoutStory.bind({});

Default.decorators = [
  (Story) => {
    const addToast = useToast();
    const toastCount = useToastLayoutStore((state) => state.toastOptions.length + 1);
    return (
      <section
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
        <Button
          onClick={() => {
            addToast({
              title: `${toastCount}번째 Toast${
                toastCount === 1 ? ', 첫번째 Toast는 긴글로 테스트합니다.' : ''
              }`,
              type: toastCount % 2 === 0 ? 'success' : 'error',
              description: toastCount % 3 === 0 ? '이것은 description 예시 입니다.' : undefined,
            });
          }}
        >
          Add Toast
        </Button>
      </section>
    );
  },
];
