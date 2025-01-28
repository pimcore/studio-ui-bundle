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

import React, { useEffect } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type UserWorkspace } from '@Pimcore/modules/user/user-api-slice.gen'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from 'antd'

interface ITableProps {
  data: UserWorkspace[]
  isLoading: boolean
  showDuplicatePropertyModal: () => void
  onUpdateData: (data: UserWorkspace[]) => void
}

export const Table = ({
  showDuplicatePropertyModal,
  data,
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
        type: 'element-cell',
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
    const updatedProperty = { ...updatedProperties.at(propertyIndex)!, [columnId]: value }
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
      isLoading={ isLoading }
      onUpdateCellData={ onUpdateCellData }
      resizable
      setRowId={ (row) => row.cid }
    />
  )
}
