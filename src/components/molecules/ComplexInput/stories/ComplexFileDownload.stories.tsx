import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComplexFileDownload } from '../ComplexInput';
import type { ComplexFileDownloadProps } from '../ComplexInput';
import React from 'react';

export default {
  title: 'molecules/ComplexInput/ComplexFileDownload',
  component: ComplexFileDownload,
} as ComponentMeta<typeof ComplexFileDownload>;

const ComplexFileDownloadStory: ComponentStory<typeof ComplexFileDownload> = (args) => (
  <ComplexFileDownload {...args} />
);

export const Default = ComplexFileDownloadStory.bind({});
const defaultArgs: ComplexFileDownloadProps = {
  id: '라벨',
  children: 'tooltip 내용이 들어갑니다.',
  placeholder: '파일이 존재하지 않습니다.',
  value: {
    label: '파일명.jpg',
    url: '#',
  },
};
Default.args = defaultArgs;
