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
  const finalProps = { 
    ...props, 
    bordered: props.border,
  }

  return useMemo(() => {
    if (!isPaddedLayout) {
      return (
        <>
          {finalProps.children}
        </>
      )
    }

    if (finalProps.collapsible === true) {
      return (
        <CollapseItem
          bordered={ finalProps.bordered }
          contentPadding={ finalProps.contentPadding }
          defaultActive={ !(finalProps.collapsed ?? true) }
          extra={ finalProps.extra }
          extraPosition={ finalProps.extraPosition }
          forceRender
          hasContentSeparator={ theme !== 'fieldset' }
          label={ (<>{finalProps.title}</>) }
          size='small'
          theme={ theme }
        >
          {finalProps.children}
        </CollapseItem>
      )
    }

    return (
      <Card
        bordered={ finalProps.bordered === true }
        contentPadding={ finalProps.contentPadding }
        extra={ finalProps.extra }
        extraPosition={ finalProps.extraPosition }
        theme={ theme }
        title={ isEmpty(finalProps.title) ? undefined : finalProps.title }
      >
        {finalProps.children}
      </Card>
    )
  }, [finalProps, isPaddedLayout, theme])
}
