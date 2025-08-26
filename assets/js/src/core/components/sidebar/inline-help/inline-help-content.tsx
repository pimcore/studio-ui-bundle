import { Box } from "@Pimcore/components/box/box";
import { Content } from "@Pimcore/components/content/content";
import { Title } from "@Pimcore/components/title/title";
import React from "react";

export interface InlineHelpContentProps {
  title: React.JSX.Element;
  description: React.JSX.Element;
}

export const InlineHelpContent = ({ title, description }: InlineHelpContentProps): React.JSX.Element => {
  return (
    <Content padded>
      <Title>{title}</Title>

      <Box>
        {description}
      </Box>
    </Content>
  );
};
