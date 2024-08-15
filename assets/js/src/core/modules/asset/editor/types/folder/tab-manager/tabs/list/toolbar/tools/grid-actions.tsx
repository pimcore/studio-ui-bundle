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

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type MenuProps } from 'antd'
import React, { useEffect } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useListSelectedRows } from '../../hooks/use-list'
import { useAssetCreateZipMutation } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useMercureCreateCookieMutation } from './mercure-api-slice.gen'

export const GridActions = (): React.JSX.Element => {
  const { selectedRows } = useListSelectedRows()
  const numberedSelectedRows = Object.keys(selectedRows).map(Number)
  const hasSelectedItems = Object.keys(selectedRows).length > 0
  const [fetchCreateZip, { data }] = useAssetCreateZipMutation()
  const [fetchMercureCookie] = useMercureCreateCookieMutation()

  useEffect(() => {
    async function fetchSomething (): Promise<void> {
      if (data !== undefined) {
        const SSEvent = new EventSource('http://localhost/studio/api/assets/download/zip/' + data.jobRunId, {
          withCredentials: true
        })

        SSEvent.onmessage = (event) => {
          console.log('Message:', event.data)
        }
      }
    }

    fetchSomething().catch(() => {
      console.error('Failed to fetch something')
    })
  }, [data])

  const menu: MenuProps = {
    items: [
      {
        key: '1',
        label: 'Batch edit',
        icon: <Icon name={ 'grid' } />,
        onClick: () => {
          console.log('Action 1')
        }
      },
      {
        key: '2',
        label: 'CSV-Export',
        icon: <Icon name={ 'export' } />,
        onClick: () => {
          console.log('Action 2')
        },
        children: [
          {
            key: '2.1',
            label: 'XLSX-Export',
            icon: <Icon name={ 'export' } />,
            onClick: () => {
              console.log('Action 2.1')
            }
          }
        ]
      },
      {
        key: '3',
        label: 'ZIP download',
        icon: <Icon name={ 'download-02' } />,
        onClick: async () => {
          await fetchMercureCookie()
          createZip()
        }
      }
    ]
  }

  return (
    <Dropdown
      disabled={ !hasSelectedItems }
      menu={ menu }
    >
      <DropdownButton key={ 'dropdown-button' }>Apply to selection</DropdownButton>
    </Dropdown>
  )

  function createZip (): void {
    fetchCreateZip({ body: { items: numberedSelectedRows } }).catch(() => {
      console.error('Failed to create zip')
    })
  }
}
