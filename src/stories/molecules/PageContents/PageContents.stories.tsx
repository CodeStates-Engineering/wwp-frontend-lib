import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageContents } from './PageContents';
import React from 'react';

export default {
  title: 'molecules/PageContents',
  component: PageContents.Container,
} as ComponentMeta<typeof PageContents.Container>;

const PageContentsStory: ComponentStory<typeof PageContents.Container> = (args) => (
  <PageContents.Container {...args} />
);

export const Default = PageContentsStory.bind({});

Default.args = {
  children: (
    <>
      <PageContents.Header title="PageContents.Header title" />
      <PageContents.Section>section1</PageContents.Section>
      <PageContents.Section>section2</PageContents.Section>
      <PageContents.Section>section3</PageContents.Section>
      <PageContents.Footer>footer</PageContents.Footer>
    </>
  ),
};
