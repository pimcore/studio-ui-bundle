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
import { useStyle } from '@Pimcore/components/element-toolbar/element-toolbar.styles'
import { Button, Space } from 'antd'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { type ElementType } from 'types/element-type.d'

export const ElementToolbar = ({ id, elementType, editorTabsWidth }: { id: number, elementType: ElementType, editorTabsWidth?: number }): React.JSX.Element => {
  const { styles } = useStyle()

  const { element } = useElementDraft(id, elementType)

  if (element === undefined) {
    return <></>
  }

  const menuItems: DropdownMenuProps['items'] = [
    {
      key: '1',
      label: `ID ${element.id} - Copy`,
      onClick: () => {
        void navigator.clipboard.writeText(
          element.id.toString()
        )
      }
    },
    {
      key: '2',
      label: 'Copy full path to clipboard',
      onClick: () => {
        void navigator.clipboard.writeText(
          element.fullPath!
        )
      }
    },
    {
      key: '3',
      label: 'Copy deep link to clipboard',
      onClick: () => {
        // @todo implement other types
        void navigator.clipboard.writeText(`
          http://localhost/admin/login/deeplink?asset_${element.id}_${element.type}
        `)
      }
    }
  ]

  return (
    <div className={ styles.toolbar }>

      <Breadcrumb
        editorTabsWidth={ editorTabsWidth }
        elementType={ elementType }
        path={ element.fullPath! }
      />

      <div className={ 'element-toolbar__info-dropdown' }>
        <Dropdown menu={ { items: menuItems } }>
          <Button
            icon={
              <Icon
                name={ 'icon' }
                options={ { width: 14, height: 7 } }
              />
            }
            iconPosition="end"
            onClick={ () => {
              void navigator.clipboard.writeText(
                element.id.toString()
              )
            } }
            size="small"
          >
            <Space>
              ID: { element.id }
            </Space>
          </Button>
        </Dropdown>
      </div>

      <Icon name={ 'target' } />
    </div>
  )
}
