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
import { isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box, type BoxProps } from '@Pimcore/components/box/box'
import { BaseView } from '@Pimcore/components/base-view/base-view'
import { TooltipIcon } from '@Pimcore/components/tooltip-icon/tooltip-icon'
import { Icon, type ElementIcon } from '@Pimcore/components/icon/icon'
import { type CollapseProps } from 'antd'
import { ItemSpacer } from '@Pimcore/components/form/layouts/item-spacer/item-spacer'

export interface PanelProps {
  title?: ReactNode
  tooltip?: ReactNode
  icon?: ElementIcon | null
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  active?: boolean
  onChange?: CollapseProps['onChange']
  children: React.ReactNode
  theme?: 'default' | 'fieldset' | 'card-with-highlight' | 'border-highlight'
  name?: string
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
  contentPadding?: BoxProps['padding']
}

export const Panel = ({
  children,
  name,
  border,
  collapsed,
  active,
  onChange,
  collapsible,
  title,
  tooltip,
  icon,
  theme = 'card-with-highlight',
  extra,
  extraPosition,
  contentPadding
}: PanelProps): React.JSX.Element => {
  const isMainPanel = name === 'pimcore_root'

  const renderTitle = (): ReactNode => {
    if (isNil(title)) {
      return undefined
    }

    const iconNode = !isNil(icon)
      ? (
        <Icon
          type={ icon.type }
          value={ icon.value }
        />
        )
      : null

    if (isNil(tooltip) && iconNode === null) {
      return title
    }

    return (
      <Flex
        align='center'
        gap='extra-small'
      >
        {iconNode}
        {title}
        {!isNil(tooltip) && <TooltipIcon tooltip={ tooltip } />}
      </Flex>
    )
  }

  const getContent = (): ReactNode => (
    <BaseView
      active={ active }
      border={ border }
      collapsed={ collapsed }
      collapsible={ collapsible }
      contentPadding={ contentPadding }
      extra={ extra }
      extraPosition={ extraPosition }
      onChange={ onChange }
      theme={ theme }
      title={ renderTitle() }
    >
      <ItemSpacer>
        {children}
      </ItemSpacer>
    </BaseView>
  )

  if (isMainPanel) {
    return (
      <Box padding='small'>
        {getContent()}
      </Box>
    )
  }

  return (
    <>
      {getContent()}
    </>
  )
}
