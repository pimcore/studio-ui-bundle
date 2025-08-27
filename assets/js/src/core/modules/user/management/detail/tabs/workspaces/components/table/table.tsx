/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type UserWorkspace } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from 'antd'
import { createTableTestId } from '@Pimcore/utils/test-id-generator'

interface ITableProps {
  data: UserWorkspace[]
  isLoading: boolean
  type?: string
  showDuplicatePropertyModal: () => void
  onUpdateData: (data: UserWorkspace[]) => void
}

export const Table = ({
  showDuplicatePropertyModal,
  data, type,
  isLoading, onUpdateData
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [gridData, setGridData] = React.useState<UserWorkspace[]>(data)

  useEffect(() => {
    setGridData(data)
  }, [data])

  const columnHelper = createColumnHelper()
  const createColumns = (): any => [
    columnHelper.accessor('cpath', {
      header: t('user-management.workspaces.columns.cpath'),
      meta: {
        type,
        editable: true,
        autoWidth: true
      },
      size: 270
    }),
    columnHelper.accessor('list', {
      header: t('user-management.workspaces.columns.list'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('view', {
      header: t('user-management.workspaces.columns.view'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('save', {
      header: t('user-management.workspaces.columns.save'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('publish', {
      header: t('user-management.workspaces.columns.publish'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('unpublish', {
      header: t('user-management.workspaces.columns.unpublish'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('delete', {
      header: t('user-management.workspaces.columns.delete'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('rename', {
      header: t('user-management.workspaces.columns.rename'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('create', {
      header: t('user-management.workspaces.columns.create'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('settings', {
      header: t('user-management.workspaces.columns.settings'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('versions', {
      header: t('user-management.workspaces.columns.versions'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('properties', {
      header: t('user-management.workspaces.columns.properties'),
      size: 76,
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('actions', {
      header: '',
      size: 40,
      cell: (context) => {
        return (
          <Flex
            align='center'
            className='w-full h-full'
            justify='center'
          >
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ (): void => {
                handleRemoveRow(context.row.id)
              } }
              type="link"
            />
          </Flex>
        )
      }
    })
  ]
  const ownTableColumns = [
    ...createColumns()
  ]

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    setGridData(gridData.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, [columnId]: value }
      }
      return item
    }))

    const updatedProperties = [...(gridData ?? [])]
    const propertyIndex = updatedProperties.findIndex((property) => property.cpath === rowData.cpath)
    const updatedProperty = { ...updatedProperties.at(propertyIndex)!, [columnId]: value, cid: value.id !== undefined ? value.id : rowData.cid, cpath: value.fullPath !== undefined ? value.fullPath : rowData.cpath }
    updatedProperties[propertyIndex] = updatedProperty
    const hasDuplicate = updatedProperties.filter(property => property.cpath === updatedProperty.cpath).length > 1

    if (hasDuplicate) {
      updatedProperty.cpath = ''
      setGridData(updatedProperties)
      showDuplicatePropertyModal()
    } else {
      setGridData(updatedProperties)
      onUpdateData(updatedProperties)
    }
  }

  const handleRemoveRow = (id: number | string): void => {
    const updatedProperties = [...(gridData ?? [])]
    const propertyIndex = updatedProperties.findIndex((property) => property.cid === id)
    updatedProperties.splice(propertyIndex, 1)
    setGridData(updatedProperties)
    onUpdateData(updatedProperties)
  }

  return (
    <Grid
      autoWidth
      columns={ ownTableColumns }
      data={ gridData }
      dataTestId={ createTableTestId(`user-workspaces-${type ?? 'unknown'}`) }
      isLoading={ isLoading }
      onUpdateCellData={ onUpdateCellData }
      resizable
      setRowId={ (row) => row.cid }
    />
  )
}
