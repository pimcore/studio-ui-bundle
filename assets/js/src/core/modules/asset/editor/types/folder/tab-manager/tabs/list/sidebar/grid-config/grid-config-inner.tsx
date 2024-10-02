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

import React, { useEffect, useMemo, useState } from 'react'
import { useListColumns, useListGridAvailableColumns } from '../../hooks/use-list'
import { useGridConfig } from './hooks/use-grid-config'
import { useAssetGetSavedGridConfigurationsQuery, useAssetSaveGridConfigurationMutation, type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { EditView } from './views/edit-view'
import { SaveView } from './views/save-view'
import { useForm } from 'antd/es/form/Form'
import { defaultValues } from './forms/save-form'
import { type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'

export const GridConfigInner = (): React.JSX.Element => {
  const { dropDownMenu } = useListGridAvailableColumns()
  const { columns: gridColumns, setGridColumns } = useListColumns()
  const { columns, setColumns, addColumn } = useGridConfig()
  const { id } = useAsset()
  const { isLoading, data } = useAssetGetSavedGridConfigurationsQuery({ folderId: id })
  const [fetchSaveGridConfig, { isLoading: isSaveLoading }] = useAssetSaveGridConfigurationMutation()
  const { t } = useTranslation()
  const [view, setView] = useState<'edit' | 'save'>('edit')
  const [form] = useForm()

  const savedGridConfigurations: DropdownMenuProps['items'] = useMemo(() => {
    if (data !== undefined) {
      return data?.items?.map((item) => {
        return {
          key: item.id,
          label: item.name,
          onClick: () => {
            console.log('load grid configuration', item)
          }
        }
      }) ?? []
    }

    return []
  }, [data])

  useEffect(() => {
    setColumns(gridColumns)
  }, [gridColumns])

  return (
    <>
      { view === 'edit' && (
        <EditView
          addColumnMenu={ getFormattedDropDownMenu() }
          columns={ columns }
          isLoading={ isLoading }
          onApplyClick={ onApplyClick }
          onCancelClick={ onCancelClick }
          onSaveConfigurationClick={ () => { setView('save') } }
          savedGridConfigurations={ savedGridConfigurations }
        />
      ) }

      { view === 'save' && (
        <SaveView
          formProps={ {
            form,
            onFinish: onFormFinish,
            initialValues: {
              ...defaultValues
            }
          } }
          isLoading={ isSaveLoading }
          onCancelClick={ () => { setView('edit') } }
        />
      ) }
    </>
  )

  function onFormFinish (values: any): void {
    const columnsToSave = columns.map((column) => ({
      key: column.key,
      locale: column.locale ?? null,
      group: column.group
    }))

    fetchSaveGridConfig({
      body: {
        columns: columnsToSave,
        folderId: id,
        name: values.name,
        description: values.description,
        setAsFavorite: values.setAsDefault,
        shareGlobal: values.shareGlobally,
        sharedRoles: [],
        sharedUsers: [],
        saveFilter: false,
        pageSize: 0
      }
    }).catch((error) => {
      console.error('Failed to save grid configuration', error)
    })
  }

  function onCancelClick (): void {
    setColumns(gridColumns)
  }

  function onApplyClick (): void {
    setGridColumns(columns)
  }

  function getFormattedDropDownMenu (): DropdownMenuProps['items'] {
    const formattedDropDownMenu: DropdownMenuProps['items'] = []
    let index = 0

    for (const [key, value] of Object.entries(dropDownMenu)) {
      formattedDropDownMenu.push({
        key: index++,
        label: t(`asset.listing.groups.${key}`),
        children: value.map((column) => ({
          key: column.key,
          label: t(`asset.listing.column.${column.key}`),
          onClick: () => { onColumnClick(column) }
        }))
      })
    }

    return formattedDropDownMenu
  }

  function onColumnClick (column: GridColumnConfiguration): void {
    addColumn(column)
  }
}
