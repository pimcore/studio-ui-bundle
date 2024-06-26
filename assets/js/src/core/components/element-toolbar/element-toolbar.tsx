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
import { Button, Dropdown, type MenuProps, Result, Space } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { useGetAssetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'

export const ElementToolbar = (): React.JSX.Element => {
  const { styles } = useStyle()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const { data, isLoading } = useGetAssetByIdQuery({
    id: context?.config.id
  })

  if (isLoading || data === undefined) {
    return <Result title="Loading..." />
  }

  const items: MenuProps['items'] = [
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
        void navigator.clipboard.writeText(`
          http://localhost/admin/login/deeplink?${context.type}_${data.id}_${data.type}
        `)
      }
    }
  ]

  return (
    <div className={ styles.toolbar }>
      <Breadcrumb path={ '/Car Images/mercedes/m600/blue/red/1961_Mercedes_Benz_190_SL_-_silver_-_rvr.jpg' } />

      <div className={ 'element-toolbar__info-dropdown' }>
        <Dropdown menu={ { items } }>
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
