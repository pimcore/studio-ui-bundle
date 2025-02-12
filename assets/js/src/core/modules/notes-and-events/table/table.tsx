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

import {
  type DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import React, { useEffect, useState } from 'react'
import { isUndefined } from 'lodash'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { usePropertyGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { verifyUpdate } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/verify-cell-update'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Text } from '@Pimcore/components/text/text'
import { Box } from '@Pimcore/components/box/box'
import { uuid } from '@Pimcore/utils/uuid'

interface ITableProps {
  propertiesTableTab: string
  showDuplicatePropertyModal: () => void
  showMandatoryModal: () => void
}

type DataPropertyWithActions = DataProperty & {
  actions: React.ReactNode
}

export const Table = ({
  propertiesTableTab,
  showDuplicatePropertyModal,
  showMandatoryModal
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement, mapToElementType } = useElementHelper()
  const { styles } = useStyles()
  const { id, elementType } = useElementContext()
  const { element, properties, setProperties, updateProperty, removeProperty, setModifiedCells } = useElementDraft(id, elementType)
  const arePropertiesAvailable = properties !== undefined && properties.length > 0

  const { data, isLoading } = usePropertyGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id
  })

  const [gridDataOwn, setGridDataOwn] = useState<DataProperty[]>([])
  const [gridDataInherited, setGridDataInherited] = useState<DataProperty[]>([])
  const modifiedCellsType = 'properties'
  const modifiedCells = element?.modifiedCells[modifiedCellsType] ?? []

  const enrichProperties = (data: DataPropertyApi[]): DataProperty[] => {
    return data.map((item) => {
      return {
        ...item,
        rowId: uuid()
      }
    })
  }

  useEffect(() => {
    if (data !== undefined && element?.changes.properties === undefined && Array.isArray(data.items)) {
      setProperties(enrichProperties(data?.items))
    }
  }, [data])

  useEffect(() => {
    if (arePropertiesAvailable) {
      setGridDataOwn(properties.filter((item) => {
        return !item.inherited
      }))

      setGridDataInherited(properties.filter((item) => {
        return item.inherited
      }))
    }
  }, [properties])

  useEffect(() => {
    if (modifiedCells.length > 0 && element?.changes.properties === undefined) {
      setModifiedCells(modifiedCellsType, [])
    }
  }, [element, modifiedCells])

  const columnHelper = createColumnHelper<DataPropertyWithActions>()
  const createColumns = (tableType: 'own' | 'inherited'): any => [
    columnHelper.accessor('type', {
      header: t('properties.columns.type'),
      meta: {
        type: 'property-icon'
      },
      size: 40
    }),
    columnHelper.accessor('key', {
      header: t('properties.columns.key'),
      meta: {
        editable: true
      },
      size: 200
    }),
    columnHelper.accessor('predefinedName', {
      header: t('properties.columns.name'),
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('properties.columns.description'),
      size: 200
    }),
    columnHelper.accessor('data', {
      header: t('properties.columns.data'),
      meta: {
        type: 'property-value',
        editable: tableType === 'own',
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('inheritable', {
      header: t('properties.columns.inheritable'),
      size: 70,
      meta: {
        type: 'checkbox',
        editable: tableType === 'own',
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 70,
      cell: (info) => {
        return (
          <div className={ 'properties-table--actions-column' }>
            {
              ['document', 'asset', 'object'].includes(info.row.original.type) &&
                info.row.original.data !== null &&
              (
                <IconButton
                  icon={ { value: 'group' } }
                  onClick={ async () => {
                    const typeValue = mapToElementType(info.row.original.type)

                    !isUndefined(typeValue) && await openElement({
                      type: typeValue,
                      id: info.row.original.data.id
                    })
                  } }
                  type="link"
                />
              )
            }

            {tableType === 'own' && (
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ () => {
                  removeProperty(info.row.original)
                } }
                type="link"
              />
            )}
          </div>
        )
      }
    })
  ]
  const ownTableColumns = [
    ...createColumns('own')
  ]
  const allTableColumns = [
    ...createColumns('inherited')
  ]

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    const updatedProperties = [...(properties ?? [])]
    const propertyIndex = updatedProperties.findIndex((property) => property.key === rowData.key && !property.inherited)
    const updatedProperty = { ...updatedProperties.at(propertyIndex)!, [columnId]: value }
    updatedProperties[propertyIndex] = updatedProperty
    const hasDuplicate = updatedProperties.filter(property => property.key === updatedProperty.key && !property.inherited).length > 1

    if (verifyUpdate(value, columnId, 'key', hasDuplicate, showMandatoryModal, showDuplicatePropertyModal)) {
      updateProperty(rowData.key as string, updatedProperty)
      setModifiedCells(modifiedCellsType, [...modifiedCells, { rowIndex: rowData.rowId, columnId }])
    }
  }

  return (
    <div className={ styles.table }>
      {(
        <>
          {(
            <Grid
              autoWidth
              columns={ ownTableColumns }
              data={ gridDataOwn }
              isLoading={ isLoading }
              modifiedCells={ modifiedCells }
              onUpdateCellData={ onUpdateCellData }
              resizable
              setRowId={ (row: DataProperty) => row.rowId }
            />
          )}

          {propertiesTableTab === 'all' && (
            <>
              <Box padding={ { y: 'small' } }>
                <Text strong>{t('properties.inherited.properties')}
                </Text>
              </Box>
              <Grid
                autoWidth
                columns={ allTableColumns }
                data={ gridDataInherited }
                resizable
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
