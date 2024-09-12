import React from 'react';
import { Typography } from 'antd';
import { ParagraphProps as AntParagraphProps } from 'antd/es/typography/Paragraph';

export interface ParagraphProps extends AntParagraphProps {}

const { Paragraph: AntParagraph } = Typography;

export const Paragraph = (props: ParagraphProps): React.JSX.Element => {
    return <AntParagraph {...props} />;
}
