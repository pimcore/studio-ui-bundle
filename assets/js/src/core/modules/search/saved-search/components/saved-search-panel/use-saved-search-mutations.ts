/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { isEmpty, isNil, isUndefined } from 'lodash'
import { type formInstanceType } from '@Pimcore/components/form/use-form'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { openSavedSearchResultWidget } from '@Pimcore/modules/search/saved-search/widget/saved-search-widget'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useSavedSearchSaveConfigurationMutation,
  useSavedSearchUpdateConfigurationMutation,
  useSavedSearchDeleteConfigurationMutation
} from '@Pimcore/modules/search/search-api-slice-enhanced'
import {
  type SavedSearchSaveConfigurationApiArg,
  type SavedSearchDetailedConfiguration
} from '@Pimcore/modules/search/search-api-slice.gen'
import { type SavedSearchFormValues } from './saved-search-form'

interface UseSavedSearchMutationsParams {
  form: formInstanceType
  loaded: SavedSearchDetailedConfiguration | undefined
  classId?: string
  elementType?: ElementType
  columns: SavedSearchSaveConfigurationApiArg['body']['columns']
  filter: SavedSearchSaveConfigurationApiArg['body']['filter']
  isSharedGlobally: boolean
  sharedUsers: number[]
  sharedRoles: number[]
  onReset: () => void
}

interface UseSavedSearchMutationsReturn {
  onSaveAsNew: () => void
  onUpdate: () => void
  onDelete: () => void
  isSaving: boolean
  isUpdating: boolean
  isDeleting: boolean
}

export const useSavedSearchMutations = (params: UseSavedSearchMutationsParams): UseSavedSearchMutationsReturn => {
  const {
    form, loaded, classId, elementType, columns, filter,
    isSharedGlobally, sharedUsers, sharedRoles, onReset
  } = params
  const { t } = useTranslation()
  const message = useMessage()
  const modal = useFormModal()
  const widgetManager = useWidgetManager()
  const { setLoadedSavedSearch, close } = useSearch()

  const [saveConfiguration, { isLoading: isSaving }] = useSavedSearchSaveConfigurationMutation()
  const [updateConfiguration, { isLoading: isUpdating }] = useSavedSearchUpdateConfigurationMutation()
  const [deleteConfiguration, { isLoading: isDeleting }] = useSavedSearchDeleteConfigurationMutation()

  const buildBody = (values: SavedSearchFormValues): SavedSearchSaveConfigurationApiArg['body'] => ({
    name: values.name,
    description: values.description,
    createMenuShortcut: values.createMenuShortcut ?? false,
    menuShortcutGroup: isEmpty(values.menuShortcutGroup) ? undefined : values.menuShortcutGroup,
    shareGlobal: isSharedGlobally,
    sharedUsers: isSharedGlobally ? [] : sharedUsers,
    sharedRoles: isSharedGlobally ? [] : sharedRoles,
    classId,
    elementType,
    columns,
    filter
  })

  // After a successful "save as new"/"clone": open the freshly created search as a main-area tab (it
  // self-loads from its id), close the tab we saved from, and close the Quick Search modal — so the
  // current tab "switches" to the new search.
  const switchToSavedSearch = (id: number, name: string): void => {
    const previousId = loaded?.id
    openSavedSearchResultWidget(widgetManager, { id, name, elementType: elementType ?? elementTypes.asset })
    if (!isNil(previousId) && previousId !== id) {
      widgetManager.closeWidget(`saved-search-${previousId}`)
    }
    close()
    onReset()
  }

  // "Save as new"/"Clone" prompts for the new search's name (so a copy gets a distinct name), then
  // creates it and switches to it. The name comes from the prompt; the remaining metadata
  // (description / shortcut / sharing) is taken from the current panel state.
  const onSaveAsNew = (): void => {
    modal.input({
      title: t('saved-search.save-as-new'),
      label: t('user-management.name'),
      initialValue: (form.getFieldValue('name') as string | undefined) ?? '',
      rule: { required: true, message: t('form.validation.provide-name') },
      okText: t('save'),
      onOk: async (name: string) => {
        const values = form.getFieldsValue() as SavedSearchFormValues
        const result = await saveConfiguration({ body: buildBody({ ...values, name }) })
        if ('data' in result && !isUndefined(result.data)) {
          message.success(t('saved-search.save.success'))
          switchToSavedSearch(result.data.id, name)
        } else if ('error' in result && !isUndefined(result.error)) {
          trackError(new ApiError(result.error))
          // Reject so the prompt stays open for a retry.
          throw new Error('saved-search-save-failed')
        }
      }
    })
  }

  const onUpdate = (): void => {
    if (isNil(loaded)) {
      return
    }
    void form.validateFields().then((values: SavedSearchFormValues) => {
      updateConfiguration({ id: loaded.id, body: buildBody(values) }).then((result) => {
        if ('error' in result && !isUndefined(result.error)) {
          trackError(new ApiError(result.error))
          return
        }
        message.success(t('saved-search.update.success'))
        // Sync the loaded snapshot to the saved state so the dirty comparison resets.
        setLoadedSavedSearch({
          ...loaded,
          name: values.name,
          description: values.description,
          createMenuShortcut: values.createMenuShortcut ?? false,
          menuShortcutGroup: isEmpty(values.menuShortcutGroup) ? null : values.menuShortcutGroup,
          shareGlobal: isSharedGlobally,
          sharedUsers,
          sharedRoles,
          columns,
          filter: [filter] as unknown as SavedSearchDetailedConfiguration['filter']
        })
      }).catch(() => { /* trigger never rejects */ })
    }).catch(() => { /* validation errors shown inline */ })
  }

  const onDelete = (): void => {
    if (isNil(loaded)) {
      return
    }
    deleteConfiguration({ id: loaded.id }).then((result) => {
      if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
        return
      }
      message.success(t('saved-search.delete.success'))
      setLoadedSavedSearch(undefined)
      onReset()
    }).catch(() => { /* trigger never rejects */ })
  }

  return { onSaveAsNew, onUpdate, onDelete, isSaving, isUpdating, isDeleting }
}
