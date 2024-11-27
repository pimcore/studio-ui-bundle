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
import { isEmpty } from 'lodash'
import { Card } from '@Pimcore/components/card/card'

export interface CardViewProps {
  title?: string
  children?: React.ReactNode
  bordered?: boolean
}

export const CardView = (props: CardViewProps): React.JSX.Element => {
  console.log(props.bordered, props.bordered === true)

  return (
    <Card
      bordered={ props.bordered === true }
      title={ isEmpty(props.title) ? undefined : props.title }
    >
      {props.children}
    </Card>
  )
}
