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
import { getFormattedDropDownMenu, useListColumns, useListGridAvailableColumns, useListGridConfig, useListSelectedConfigId } from '../../hooks/use-list'
import { useGridConfig } from './hooks/use-grid-config'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import {
  type GridColumnConfiguration,
  useAssetDeleteGridConfigurationByConfigurationIdMutation,
  useAssetGetGridConfigurationByFolderIdQuery,
  useAssetGetSavedGridConfigurationsQuery,
  useAssetSaveGridConfigurationMutation,
  useAssetUpdateGridConfigurationMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { EditView } from './views/edit-view'
import { SaveView } from './views/save-view'
import { useForm } from 'antd/es/form/Form'
import { defaultValues } from './forms/save-form'
import { type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Content } from '@Pimcore/components/content/content'
import { useRoleGetCollectionQuery } from '@Pimcore/modules/user/role/role-api-slice-enhanced'
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'

enum ViewState {
  Edit = 'edit',
  Save = 'save',
  Update = 'update'
}

export const GridConfigInner = (): React.JSX.Element => {
  const { dropDownMenu } = useListGridAvailableColumns()
  const { columns: gridColumns, setGridColumns } = useListColumns()
  const { columns, setColumns, addColumn } = useGridConfig()
  const { id } = useAsset()
  const userData = useUser()
  const { selectedGridConfigId, setSelectedGridConfigId } = useListSelectedConfigId()
  const { gridConfig } = useListGridConfig()

  const { isLoading, isFetching, data } = useAssetGetSavedGridConfigurationsQuery({ folderId: id })
  const { data: roleList } = useRoleGetCollectionQuery()
  const { data: userList } = useUserGetCollectionQuery()
  const { isFetching: gridConfigIsLoading } = useAssetGetGridConfigurationByFolderIdQuery({
    folderId: id,
    configurationId: selectedGridConfigId
  })

  const [fetchSaveGridConfig, { isLoading: isSaveLoading }] = useAssetSaveGridConfigurationMutation()
  const [fetchUpdateGridConfig, { isLoading: isUpdating }] = useAssetUpdateGridConfigurationMutation()
  const [fetchDeleteGridConfig, { isLoading: isDeleting }] = useAssetDeleteGridConfigurationByConfigurationIdMutation()

  const [view, setView] = useState<ViewState>(ViewState.Edit)
  const [form] = useForm()

  const isSavedConfiguration = gridConfig?.name !== 'Predefined' && gridConfig !== undefined

  const savedGridConfigurations: DropdownMenuProps['items'] = useMemo(() => {
    if (data !== undefined) {
      return data.items?.map((item) => {
        return {
          key: item.id,
          label: item.name,
          onClick: () => {
            setSelectedGridConfigId(item.id)
          }
        }
      }) ?? []
    }

    return []
  }, [data])

  useEffect(() => {
    setColumns(gridColumns)
  }, [gridColumns])

  function onDeleteClick (): void {
    if (isSavedConfiguration) {
      fetchDeleteGridConfig({ configurationId: gridConfig.id!, folderId: id }).then(() => {
        setView(ViewState.Edit)
        setSelectedGridConfigId(undefined)
      }).catch((error) => {
        console.error('Failed to switch to edit view', error)
      })
    }
  }

  function onUpdatedConfigurationClick (): void {
    if (gridConfig === undefined) {
      console.error('No grid configuration available')
      return
    }

    fetchUpdateGridConfig({
      configurationId: gridConfig.id!,
      body: {
        columns: prepareColumns(columns),
        name: gridConfig.name,
        description: gridConfig.description,
        setAsFavorite: gridConfig.setAsFavorite,
        shareGlobal: gridConfig.shareGlobal,
        sharedRoles: gridConfig.sharedRoles,
        sharedUsers: gridConfig.sharedUsers,
        saveFilter: false,
        pageSize: 0
      }
    }).catch((error) => {
      console.error('Failed to update grid configuration', error)
    })
  }

  function prepareColumns (columns: GridColumnConfiguration[]): Array<{ key: string, locale: string | null, group: string }> {
    return columns.map((column) => ({
      key: column.key,
      locale: column.locale ?? null,
      group: column.group
    }))
  }

  function onFormFinish (values: any): void {
    const columnsToSave = prepareColumns(columns)

    if (view === ViewState.Update && isSavedConfiguration) {
      fetchUpdateGridConfig({
        configurationId: gridConfig.id!,
        body: {
          columns: columnsToSave,
          name: values.name,
          description: values.description,
          setAsFavorite: values.setAsDefault,
          shareGlobal: values.shareGlobally,
          // @todo currently conflicting with global sharing => fix in the backend needed first
          sharedRoles: gridConfig.sharedRoles,
          sharedUsers: gridConfig.sharedUsers,
          saveFilter: false,
          pageSize: 0
        }
      }).catch((error) => {
        console.error('Failed to update grid configuration', error)
      }).then(() => {
        setView(ViewState.Edit)
      }).catch((error) => {
        console.error('Failed to switch to edit view', error)
      })
    }

    if (view === ViewState.Save) {
      fetchSaveGridConfig({
        body: {
          columns: columnsToSave,
          folderId: id,
          name: values.name,
          description: values.description,
          setAsFavorite: values.setAsDefault,
          shareGlobal: values.shareGlobally,
          saveFilter: false,
          pageSize: 0
        }
      }).catch((error) => {
        console.error('Failed to save grid configuration', error)
      }).then((response) => {
        if (response?.data !== undefined) {
          setSelectedGridConfigId(response.data.id)
          setView(ViewState.Edit)
        }
      }).catch((error) => {
        console.error('Failed to switch to edit view', error)
      })
    }
  }

  const onCancelClick = (): void => { setColumns(gridColumns) }

  const onApplyClick = (): void => { setGridColumns(columns) }

  const onColumnClick = (column: GridColumnConfiguration): void => {
    addColumn(column)
  }

  if (gridConfigIsLoading || isDeleting) {
    return <Content loading />
  }

  return (
    <>
      { view === ViewState.Edit && (
        <EditView
          addColumnMenu={ getFormattedDropDownMenu(dropDownMenu, onColumnClick) }
          columns={ columns }
          gridConfig={ gridConfig }
          isLoading={ isLoading || isFetching }
          isUpdating={ isUpdating }
          onApplyClick={ onApplyClick }
          onCancelClick={ onCancelClick }
          onEditConfigurationClick={ () => {
            setView(ViewState.Update)
          } }
          onSaveConfigurationClick={ () => { setView(ViewState.Save) } }
          onUpdateConfigurationClick={ onUpdatedConfigurationClick }
          savedGridConfigurations={ savedGridConfigurations }
        />
      ) }

      { (view === ViewState.Save || view === ViewState.Update) && (
        <SaveView
          formProps={ {
            form,
            onFinish: onFormFinish,
            initialValues:
              view === ViewState.Update && isSavedConfiguration
                ? {
                    name: gridConfig?.name,
                    description: gridConfig?.description,
                    setAsDefault: gridConfig?.setAsFavorite,
                    shareGlobally: gridConfig?.shareGlobal
                  }
                : {
                    ...defaultValues
                  }
          } }
          isDeleting={ isDeleting }
          isLoading={ isSaveLoading }
          modificationDate={ gridConfig?.modificationDate }
          onCancelClick={ () => { setView(ViewState.Edit) } }
          onDeleteClick={ isSavedConfiguration ? onDeleteClick : undefined }
          roleList={ roleList }
          saveAsNewConfiguration={ view === ViewState.Save }
          userList={ userList }
          userName={ userData?.username }
        />
      ) }
    </>
  )
}
