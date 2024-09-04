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
import { Collapse, type CollapseProps } from 'antd'
import { useStyles } from '@Pimcore/components/accordion/accordion.styles'

export interface AccordionProps extends CollapseProps {
  exclusive: boolean
}

export const Accordion = ({ items, exclusive, ...props }: AccordionProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Collapse
      accordion={ exclusive }
      className={ [styles.accordion, 'accordion'].join(' ') }
      defaultActiveKey={ ['1'] }
      expandIconPosition='end'
      items={ items }
      { ...props }
    />
  )
}
