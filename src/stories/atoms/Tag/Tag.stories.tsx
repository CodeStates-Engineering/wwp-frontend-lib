import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tag } from './Tag';

export default {
  title: 'atoms/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const TagStory: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = TagStory.bind({});
Default.args = {
  children: '태그',
};

Default.argTypes = {
  theme: {
    table: {
      type: {
        summary: `
        "wewin-blue600" 
        | "gray700" 
        | "wewin-gold700" 
        | "mint700" 
        | "gray200" 
        | "gray600" 
        | "peach500"
        | "wewin-orange600"
        | "green600"
        `,
      },
    },
  },
};
