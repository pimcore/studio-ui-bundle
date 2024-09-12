import React from "react";
import {  TextProps as AntTextProps } from "antd/es/typography/Text";
import { Typography } from "antd";

export interface TextProps extends AntTextProps {}

const { Text: AntText } = Typography;

export const Text = (props: TextProps): React.JSX.Element => {
  return <AntText {...props} />;
}

