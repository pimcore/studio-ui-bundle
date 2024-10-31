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

export interface PanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export const Panel = ({ children, name, border, collapsed, collapsible, title }: PanelProps): React.JSX.Element => {
  return (
    <>
      { name === 'pimcore_root'
        ? (
          <>
            { getContent() }
          </>
          )
        : null }

      { name !== 'pimcore_root'
        ? (
          <BaseView
            border={ border }
            collapsed={ collapsed }
            collapsible={ collapsible }
            title={ title }
          >
            { getContent() }
          </BaseView>
          )
        : null }
    </>
  )

  function getContent (): ReactNode {
    return (
      <>
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          {children.map((child, index) => (
            <ObjectComponent
              { ...child }
              key={ child.name }
            />
          ))}
        </Space>
      </>
    )
  }
}
