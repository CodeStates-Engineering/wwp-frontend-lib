import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Textbox } from '../Textbox';
import React from 'react';

export default {
  title: 'atoms/Textbox',
  component: Textbox,
} as ComponentMeta<typeof Textbox>;

const TextboxStory: ComponentStory<typeof Textbox> = (args) => <Textbox {...args} />;

export const Default = TextboxStory.bind({});
Default.args = {
  unit: '%',
};

Default.argTypes = {
  type: {
    defaultValue: 'text',
    control: {
      type: 'radio',
    },
    table: {
      defaultValue: {
        summary: 'text',
      },
    },
  },
  theme: {
    defaultValue: 'box',
    control: {
      type: 'radio',
    },
  },
  name: {
    defaultValue: undefined,
    control: {
      type: 'text',
    },
  },
  unit: {
    defaultValue: undefined,
    control: {
      type: 'object',
    },
  },
  placeholder: {
    defaultValue: '내용을 입력하세요.',
    control: {
      type: 'text',
    },
    table: {
      defaultValue: {
        summary: '내용을 입력하세요.',
      },
    },
  },
  modifier: {
    defaultValue: 'user',
    control: {
      type: 'radio',
    },
  },
  disabled: {
    defaultValue: undefined,
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    defaultValue: undefined,
    control: {
      type: 'boolean',
    },
  },
  id: {
    defaultValue: undefined,
    control: {
      type: 'text',
    },
  },
  className: {
    defaultValue: undefined,
    control: {
      type: 'text',
    },
  },
  width: {
    defaultValue: '246px',
    control: {
      type: 'text',
    },
  },
  onChange: {
    defaultValue: undefined,
    control: {
      type: 'function',
    },
  },
};
