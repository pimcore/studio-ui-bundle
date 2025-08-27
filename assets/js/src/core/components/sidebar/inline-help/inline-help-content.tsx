/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box } from '@Pimcore/components/box/box'
import { Content } from '@Pimcore/components/content/content'
import { Title } from '@Pimcore/components/title/title'
import React from 'react'

export interface InlineHelpContentProps {
  title: React.JSX.Element
  description: React.JSX.Element
}

export const InlineHelpContent = ({ title, description }: InlineHelpContentProps): React.JSX.Element => {
  return (
    <Content padded>
      <Title>{title}</Title>

      <Box>
        {description}
      </Box>
    </Content>
  )
}
