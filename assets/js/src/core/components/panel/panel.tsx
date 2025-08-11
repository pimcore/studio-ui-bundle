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
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'
import { BaseView } from '@Pimcore/components/base-view/base-view'

export interface PanelProps {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: React.ReactNode
  theme?: 'fieldset' | 'card-with-highlight'
  name?: string
  noteditable?: boolean
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
}

export const Panel = ({ 
  children, 
  name, 
  border, 
  collapsed, 
  collapsible, 
  title, 
  theme = 'card-with-highlight', 
  noteditable,
  extra,
  extraPosition 
}: PanelProps): React.JSX.Element => {
  const isMainPanel = name === 'pimcore_root'

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

  function getContent(): ReactNode {
    return (
      <BaseView
        border={border}
        collapsed={collapsed}
        collapsible={collapsible}
        extra={extra}
        extraPosition={extraPosition}
        theme={theme}
        title={title}
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          {children}
        </Space>
      </BaseView>
    )
  }
}
