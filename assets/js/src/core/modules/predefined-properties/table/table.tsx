/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import React, { useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { uuid } from '@Pimcore/utils/uuid'
import { usePredefinedProperties } from '../hooks/use-predefined-properties'
import { PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'

type DataPropertyWithActions = DataProperty & {
  actions: React.ReactNode
}

export const Table = (): React.JSX.Element => {
  const { t } = useTranslation()
  // const { openElement, mapToElementType } = useElementHelper()
  const { styles } = useStyles()
  const { predefinedProperties, isLoading } = usePredefinedProperties()
  const arePredefinedPropertiesAvailable = predefinedProperties !== undefined

  const [gridDataOwn, setGridDataOwn] = useState<PredefinedProperty[]>([])
  // const modifiedCellsType = 'properties'
  // const modifiedCells = element?.modifiedCells[modifiedCellsType] ?? []

    const enrichPredefinedProperties = (predefinedProperties: PredefinedProperty[]): PredefinedProperty[] => {
      return predefinedProperties.map((item) => {
        return {
          ...item,
          rowId: uuid()
        }
      })
    }

  // useEffect(() => {
  //   if (data !== undefined && element?.changes.properties === undefined && Array.isArray(data.items)) {
  //     setProperties(enrichProperties(data?.items))
  //   }
  // }, [data])

  useEffect(() => {
    if (arePredefinedPropertiesAvailable) {
      setGridDataOwn(enrichPredefinedProperties(predefinedProperties))
    }
  }, [predefinedProperties])


  console.log("predefined Pros", predefinedProperties);
  
  const columnHelper = createColumnHelper<DataPropertyWithActions>()
  const createColumns = (): any => [
    columnHelper.accessor('type', {
      header: t('properties.columns.type'),
      meta: {
        type: 'property-icon'
      },
      size: 44
     })
    // columnHelper.accessor('key', {
    //   header: t('properties.columns.key'),
    //   meta: {
    //     editable: isEditable && tableType === 'own'
    //   },
    //   size: 200
    // }),
    // columnHelper.accessor('predefinedName', {
    //   header: t('properties.columns.name'),
    //   size: 200
    // }),
    // columnHelper.accessor('description', {
    //   header: t('properties.columns.description'),
    //   size: 200
    // }),
    // columnHelper.accessor('data', {
    //   header: t('properties.columns.data'),
    //   meta: {
    //     type: 'property-value',
    //     editable: isEditable && tableType === 'own',
    //     autoWidth: true
    //   },
    //   size: 300
    // }),
    // columnHelper.accessor('inheritable', {
    //   header: t('properties.columns.inheritable'),
    //   size: 74,
    //   meta: {
    //     type: 'checkbox',
    //     editable: isEditable && tableType === 'own',
    //     config: {
    //       align: 'center'
    //     }
    //   }
    // }),
    // columnHelper.accessor('actions', {
    //   header: t('properties.columns.actions'),
    //   size: 70,
    //   cell: (info) => {
    //     return (
    //       <div className={ 'properties-table--actions-column' }>
    //         {
    //           ['document', 'asset', 'object'].includes(info.row.original.type) &&
    //             info.row.original.data !== null &&
    //           (
    //             <IconButton
    //               icon={ { value: 'open-folder' } }
    //               onClick={ async () => {
    //                 const typeValue = mapToElementType(info.row.original.type)

    //                 !isUndefined(typeValue) && await openElement({
    //                   type: typeValue,
    //                   id: info.row.original.data.id
    //                 })
    //               } }
    //               type="link"
    //             />
    //           )
    //         }

    //         {tableType === 'own' && (
    //           <IconButton
    //             icon={ { value: 'trash' } }
    //             onClick={ () => {
    //               removeProperty(info.row.original)
    //             } }
    //             type="link"
    //           />
    //         )}
    //       </div>
    //     )
    //   }
    // })
  ]

  const tableColumns = [
    ...createColumns()
  ]

  // const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
  //   const updatedProperties = [...(properties ?? [])]
  //   const propertyIndex = updatedProperties.findIndex((property) => property.key === rowData.key && !property.inherited)
  //   const updatedProperty = { ...updatedProperties.at(propertyIndex)!, [columnId]: value }
  //   updatedProperties[propertyIndex] = updatedProperty
  //   const hasDuplicate = updatedProperties.filter(property => property.key === updatedProperty.key && !property.inherited).length > 1

  //   if (verifyUpdate(value, columnId, 'key', hasDuplicate, showMandatoryModal, showDuplicatePropertyModal)) {
  //     updateProperty(rowData.key as string, updatedProperty)
  //     setModifiedCells(modifiedCellsType, [...modifiedCells, { rowIndex: rowData.rowId, columnId }])
  //   }
  // }

  return (
    <div className={ styles.table }>
      {(
        <>
          (
            <Grid
              autoWidth
              columns={ tableColumns }
              data={ gridDataOwn }
              isLoading={ isLoading }
              modifiedCells={ []}
              onUpdateCellData={ () => console.log("update")}
              resizable
              setRowId={ (row: DataProperty) => row.rowId }
            />
          )
        </>
      )}
    </div>
  )
}
