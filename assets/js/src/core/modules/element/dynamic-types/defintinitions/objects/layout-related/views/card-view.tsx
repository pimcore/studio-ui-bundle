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

import React, { type ReactNode } from 'react'
import { isEmpty } from 'lodash'
import { Card } from '@Pimcore/components/card/card'
import { type BoxProps } from '@Pimcore/components/box/box'

export interface CardViewProps {
  title?: ReactNode
  children?: React.ReactNode
  collapsible?: false
  bordered?: boolean
  theme?: 'fieldset' | 'card-with-highlight' | 'default'
  contentPadding?: BoxProps['padding']
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
}

export const CardView = (props: CardViewProps): React.JSX.Element => {
  return (
    <Card
      bordered={ props.bordered === true }
      contentPadding={ props.contentPadding }
      extra={ props.extra }
      extraPosition={ props.extraPosition }
      theme={ props.theme }
      title={ isEmpty(props.title) ? undefined : props.title }
    >
      {props.children}
    </Card>
  )
}
