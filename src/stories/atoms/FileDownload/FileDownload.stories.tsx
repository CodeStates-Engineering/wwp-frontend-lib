import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileDownload } from './FileDownload';
import type { FileDownloadProps } from './FileDownload';
import React from 'react';

export default {
  title: 'atoms/FileDownload',
  component: FileDownload,
} as ComponentMeta<typeof FileDownload>;

const HrStory: ComponentStory<typeof FileDownload> = (args) => <FileDownload {...args} />;

export const Default = HrStory.bind({});
const defaultArgs: FileDownloadProps = {
  value: {
    label: '파일명.jpg',
    url: '#',
  },
};
Default.args = defaultArgs;
