/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
  theme?: 'fieldset' | 'card-with-highlight' | 'default' | 'border-highlight'
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
