/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { Card } from '@Pimcore/components/card/card'
import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'
import { type BoxProps } from '@Pimcore/components/box/box'

export interface BaseViewProps {
  title?: React.ReactNode
  children?: React.ReactNode
  bordered?: boolean
  border?: boolean
  collapsed?: boolean
  collapsible?: boolean
  theme?: 'fieldset' | 'card-with-highlight' | 'default' | 'border-highlight'
  contentPadding?: BoxProps['padding']
  extra?: React.ReactNode
  extraPosition?: 'start' | 'end'
}

export const BaseView = ({ theme = 'card-with-highlight', ...props }: BaseViewProps): React.JSX.Element => {
  const isPaddedLayout = props.border === true || props.collapsible === true || !isEmpty(props.title)

  return useMemo(() => {
    if (!isPaddedLayout) {
      return (
        <>
          {props.children}
        </>
      )
    }

    if (props.collapsible === true) {
      return (
        <CollapseItem
          bordered={ props.bordered }
          contentPadding={ props.contentPadding }
          defaultActive={ !(props.collapsed ?? true) }
          extra={ props.extra }
          extraPosition={ props.extraPosition }
          forceRender
          hasContentSeparator={ theme !== 'fieldset' }
          label={ (<>{props.title}</>) }
          size='small'
          theme={ theme }
        >
          {props.children}
        </CollapseItem>
      )
    }

    return (
      <Card
        bordered={ props.bordered === true }
        contentPadding={ props.contentPadding }
        extra={ props.extra }
        extraPosition={ props.extraPosition }
        theme={ theme }
        title={ isEmpty(props.title) ? undefined : props.title }
      >
        {props.children}
      </Card>
    )
  }, [props, isPaddedLayout, theme])
}
