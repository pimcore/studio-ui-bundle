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
import { isEmpty } from 'lodash'
import { useGridConfig as useTabGridConfig } from './hooks/use-grid-config'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import {
  useAssetDeleteGridConfigurationByConfigurationIdMutation,
  useAssetGetGridConfigurationByFolderIdQuery,
  useAssetGetSavedGridConfigurationsQuery,
  useAssetSaveGridConfigurationMutation,
  useAssetUpdateGridConfigurationMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { EditView } from './views/edit-view'
import { SaveView } from './views/save-view'
import { useForm } from 'antd/es/form/Form'
import { defaultValues } from './forms/save-form'
import { type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Content } from '@Pimcore/components/content/content'
import { useRoleGetCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useGridConfig } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config'
import { useSelectedGridConfigId } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'

enum ViewState {
  Edit = 'edit',
  Save = 'save',
  Update = 'update'
}

export const GridConfigInner = (): React.JSX.Element => {
  const { useElementId } = useSettings()
  const { getAvailableColumnsDropdown } = useAvailableColumns()
  const { selectedColumns, setSelectedColumns } = useSelectedColumns()
  const { columns, setColumns, addColumn } = useTabGridConfig()
  const { getId } = useElementId()
  const userData = useUser()
  const { id: selectedGridConfigId, setId: setSelectedGridConfigId } = useSelectedGridConfigId()
  const { gridConfig, setGridConfig } = useGridConfig()

  const { isLoading, isFetching, data } = useAssetGetSavedGridConfigurationsQuery({ folderId: getId() })
  const { data: roleList } = useRoleGetCollectionQuery()
  const { data: userList } = useUserGetCollectionQuery()
  const { isFetching: gridConfigIsLoading } = useAssetGetGridConfigurationByFolderIdQuery({
    folderId: getId(),
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
    setColumns(selectedColumns.map(column => column.originalApiDefinition!) as AvailableColumn[])
  }, [selectedColumns])

  const onColumnClick = (column: AvailableColumn): void => {
    addColumn(column)
  }

  const availableColumnsDropdown = useMemo(() => getAvailableColumnsDropdown(onColumnClick), [getAvailableColumnsDropdown, columns])

  function onDeleteClick (): void {
    if (isSavedConfiguration) {
      fetchDeleteGridConfig({ configurationId: gridConfig.id!, folderId: getId() }).then(() => {
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
        folderId: getId(),
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

  function prepareColumns (columns: AvailableColumn[]): Array<{ key: string, locale: string | null, group: string }> {
    return columns.map((column) => ({
      key: column.key,
      locale: column.locale ?? null,
      group: column.group
    }))
  }

  function onFormFinish (values: any): void {
    const columnsToSave = prepareColumns(columns)

    const isShareGlobally = values.shareGlobally === true

    // for global sharing the sharedUsers and sharedRoles need to be cleared
    // @todo Check if we really should modify the global grid config here...
    if (isShareGlobally && !isEmpty(gridConfig)) {
      setGridConfig({
        ...gridConfig,
        sharedUsers: [],
        sharedRoles: []
      })
    }

    if (view === ViewState.Update && isSavedConfiguration) {
      fetchUpdateGridConfig({
        configurationId: gridConfig.id!,
        body: {
          folderId: getId(),
          columns: columnsToSave,
          name: values.name,
          description: values.description,
          setAsFavorite: values.setAsDefault,
          shareGlobal: values.shareGlobally,
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
        folderId: getId(),
        body: {
          folderId: getId(),
          columns: columnsToSave,
          name: values.name,
          description: values.description,
          setAsFavorite: values.setAsDefault,
          shareGlobal: values.shareGlobally,
          sharedRoles: gridConfig?.sharedRoles,
          sharedUsers: gridConfig?.sharedUsers,
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

  const onCancelClick = (): void => { setColumns(selectedColumns.map(column => column.originalApiDefinition!) as AvailableColumn[]) }

  const onApplyClick = (): void => {
    setSelectedColumns(columns.map(column => {
      return {
        key: column.key,
        locale: column.locale,
        type: column.type,
        config: column.config,
        sortable: column.sortable,
        editable: column.editable,
        localizable: column.localizable,
        exportable: column.exportable,
        frontendType: column.frontendType,
        group: column.group,
        originalApiDefinition: column
      }
    }))
  }

  if (gridConfigIsLoading || isDeleting) {
    return <Content loading />
  }

  return (
    <>
      { view === ViewState.Edit && (
        <EditView
          addColumnMenu={ availableColumnsDropdown.menu.items }
          columns={ columns }
          currentUserId={ userData?.id }
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
          isLoading={ isSaveLoading || isUpdating }
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
