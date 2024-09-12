/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Typography } from 'antd'
import { type ParagraphProps as AntParagraphProps } from 'antd/es/typography/Paragraph'

export interface ParagraphProps extends AntParagraphProps {}

const { Paragraph: AntParagraph } = Typography

export const Paragraph = (props: ParagraphProps): React.JSX.Element => {
  return <AntParagraph { ...props } />
}
