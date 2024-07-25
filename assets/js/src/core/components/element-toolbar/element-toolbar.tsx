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
import { Button, Dropdown, type MenuProps, Space } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { ElementToolbarSkeleton } from '@Pimcore/components/element-toolbar/element-toolbar.skeleton'

export const ElementToolbar = ({ id }: { id: number }): React.JSX.Element => {
  const { styles } = useStyle()

  const { data, isLoading } = useGetAssetByIdQuery({
    id
  })

  if (isLoading || data === undefined) {
    return <ElementToolbarSkeleton />
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: `ID ${data.id} - Copy`,
      onClick: () => {
        void navigator.clipboard.writeText(
          data.id.toString()
        )
      }
    },
    {
      key: '2',
      label: 'Copy full path to clipboard',
      onClick: () => {
        void navigator.clipboard.writeText(
          data.fullPath!
        )
      }
    },
    {
      key: '3',
      label: 'Copy deep link to clipboard',
      onClick: () => {
        // @todo implement other types
        void navigator.clipboard.writeText(`
          http://localhost/admin/login/deeplink?asset_${data.id}_${data.type}
        `)
      }
    }
  ]

  return (
    <div className={ styles.toolbar }>

      <Breadcrumb path={ data.fullPath! } />

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
                data.id.toString()
              )
            } }
            size="small"
          >
            <Space>
              ID: { data.id }
            </Space>
          </Button>
        </Dropdown>
      </div>

      <Icon name={ 'target' } />
    </div>
  )
}
