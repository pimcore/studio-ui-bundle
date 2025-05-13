/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Typography } from 'antd'
import { type ParagraphProps as AntParagraphProps } from 'antd/es/typography/Paragraph'

export interface ParagraphProps extends AntParagraphProps {}

const { Paragraph: AntParagraph } = Typography

export const Paragraph = (props: ParagraphProps): React.JSX.Element => {
  return <AntParagraph { ...props } />
}
