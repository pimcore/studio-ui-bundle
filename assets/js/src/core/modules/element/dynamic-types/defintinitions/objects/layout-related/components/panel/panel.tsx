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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { BaseView } from '../../views/base-view'
import { Space } from '@Pimcore/components/space/space'
import { Box } from '@Pimcore/components/box/box'

export interface PanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  theme?: 'fieldset' | 'card-with-highlight'
}

export const Panel = ({ children, name, border, collapsed, collapsible, title, theme = 'card-with-highlight' }: PanelProps): React.JSX.Element => {
  const isMainPanel = name === 'pimcore_root'
  const hasTabPanel = children.find((child) => child.fieldType === 'tabpanel' || child.fieldtype === 'tabpanel') !== undefined

  if (isMainPanel && !hasTabPanel) {
    return (
      <Box padding={ 'small' }>
        { getContent() }
      </Box>
    )
  }

  return (
    <>
      { getContent() }
    </>
  )

  function getContent (): ReactNode {
    return (
      <BaseView
        border={ border }
        collapsed={ collapsed }
        collapsible={ collapsible }
        theme={ theme }
        title={ title }
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          {children.map((child, index) => (
            <ObjectComponent
              { ...getChildProperties(child) }
              key={ index }
            />
          ))}
        </Space>
      </BaseView>
    )
  }

  function getChildProperties (child: AbstractObjectLayoutDefinition): AbstractObjectLayoutDefinition {
    const isTabpanelChild = child.fieldType === 'tabpanel' || child.fieldtype === 'tabpanel'

    const newChildProps = { ...child }

    if (isTabpanelChild && isMainPanel) {
      newChildProps.hasStickyHeader = true
    }

    return newChildProps
  }
}
