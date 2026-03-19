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
import { Space } from '@Pimcore/components/space/space'
import { Box, type BoxProps } from '@Pimcore/components/box/box'
import { BaseView } from '@Pimcore/components/base-view/base-view'
import { TooltipIcon } from '@Pimcore/components/tooltip-icon/tooltip-icon'
import { type CollapseProps } from 'antd'
import { ItemSpacer } from '@Pimcore/components/form/layouts/item-spacer/item-spacer'

export interface PanelProps {
  title?: ReactNode
  tooltip?: ReactNode
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

    if (isNil(tooltip)) {
      return title
    }

    return (
      <Space size='extra-small'>
        {title}
        <TooltipIcon tooltip={ tooltip } />
      </Space>
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
