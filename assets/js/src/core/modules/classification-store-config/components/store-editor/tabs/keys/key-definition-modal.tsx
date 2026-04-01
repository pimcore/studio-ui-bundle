/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { AreaProvider } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { SettingsProvider } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { LayoutProvider, useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { LayoutForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/layout-form'
import {
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'

interface IKeyDefinitionModalProps {
  open: boolean
  keyDetail: ClassificationStoreConfigurationKeyDetail | undefined
  onClose: () => void
  onSaved: () => void
}

/**
 * Stable module-level area constant to avoid creating a new array reference on every render.
 */
const AREA = ['classification-store']

/**
 * Inner component that sets currentFieldDefinitionId once structure is ready
 * and exposes getLayout to the parent via a callback ref.
 */
const KeyDefinitionFormBridge = ({
  noPadding,
  onGetLayout
}: {
  noPadding?: boolean
  onGetLayout: (fn: () => Layout | undefined) => void
}): React.JSX.Element => {
  const { structure, setCurrentFieldDefinitionId, setCurrentFieldDefinitionIdPath, currentFieldDefinitionId, getLayout } = useLayout()

  // Expose getLayout upward
  useEffect(() => {
    onGetLayout(getLayout)
  }, [getLayout])

  // Auto-select the single root field once structure is ready.
  // Also set currentFieldDefinitionIdPath so layout-form.tsx never receives null.
  useEffect(() => {
    if (structure !== undefined && currentFieldDefinitionId === null) {
      setCurrentFieldDefinitionId(structure.id)
      setCurrentFieldDefinitionIdPath([structure.id])
    }
  }, [structure, currentFieldDefinitionId, setCurrentFieldDefinitionId, setCurrentFieldDefinitionIdPath])

  return <LayoutForm noPadding={ noPadding } />
}

/**
 * Stub hooks required by SettingsProvider but not used in our isolated modal context.
 * They must satisfy the AnyQueryHook / AnyMutationHook signatures.
 */
const useStubQuery: any = () => ({
  data: undefined,
  isLoading: false,
  isFetching: false,
  refetch: () => undefined
})

const useStubMutation: any = () => [() => undefined, { isLoading: false }]

/**
 * Stable (module-level) empty form fields component so SettingsProvider's
 * useMemo deps never see a new reference and trigger cascading re-renders.
 */
const NoFormFields = (): null => null

export const KeyDefinitionModal = ({
  open,
  keyDetail,
  onClose,
  onSaved
}: IKeyDefinitionModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [updateKey] = useClassificationStoreConfigurationKeyUpdateMutation()

  // Ref to the getLayout function — updated by KeyDefinitionFormBridge
  const getLayoutRef = useRef<(() => Layout | undefined) | null>(null)

  const handleGetLayout = useCallback((fn: () => Layout | undefined): void => {
    getLayoutRef.current = fn
  }, [])

  const handleSave = async (): Promise<void> => {
    if (keyDetail === undefined || getLayoutRef.current === null) return
    const layout = getLayoutRef.current()
    const keyDefinition = keyDetail.definition as { title?: unknown } | null
    const title = typeof keyDefinition?.title === 'string' ? keyDefinition.title : null

    const response = await updateKey({
      id: keyDetail.id,
      classificationStoreConfigurationKeyUpdate: {
        name: keyDetail.name,
        title,
        description: keyDetail.description,
        type: keyDetail.type,
        definition: (layout as Record<string, unknown> | null | undefined) ?? null
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
      return
    }

    onSaved()
  }

  /**
   * Build a Layout-compatible object from the key's stored definition.
   * The definition blob is the raw JSON from the backend — we merge in the
   * key's `type` field as `fieldtype` so the registry can look up the correct type.
   */
  const buildLayout = (): Layout | undefined => {
    if (keyDetail === undefined) return undefined

    const base: Record<string, unknown> = {
      name: keyDetail.name,
      title: keyDetail.name,
      dataType: 'data',
      fieldType: keyDetail.type,
      fieldtype: keyDetail.type,
      type: null,
      layout: null,
      region: null,
      width: 0,
      height: 0,
      collapsible: false,
      collapsed: false,
      bodyStyle: null,
      locked: false,
      children: [],
      icon: null,
      labelAlign: 'left',
      labelWidth: 100,
      border: false
    }

    if (keyDetail.definition !== null && keyDetail.definition !== undefined) {
      // Merge stored definition over the defaults (stored values take priority),
      // then restore fieldType/fieldtype from keyDetail.type so the correct field
      // type is always used — even during the optimistic update window when the
      // definition blob may still reference the previous type.
      return {
        ...base,
        ...keyDetail.definition,
        fieldType: keyDetail.type,
        fieldtype: keyDetail.type
      } as unknown as Layout
    }

    return base as unknown as Layout
  }

  const layout = buildLayout()

  return (
    <Modal
      destroyOnClose
      okText={ t('save') }
      onCancel={ onClose }
      onOk={ () => { void handleSave() } }
      open={ open }
      styles={ { body: { maxHeight: '65vh', overflowY: 'auto' } } }
      title={ keyDetail !== undefined ? t('classification-store.edit-key-definition', { keyName: keyDetail.name }) : '' }
      width={ 900 }
    >
      {keyDetail !== undefined && (
        <AreaProvider area={ AREA }>
          <SettingsProvider
            GeneralSettingsFormFields={ NoFormFields }
            useDetailGeneralSettingsQuery={ useStubQuery }
            useDetailUpdateMutation={ useStubMutation }
            useItemsQuery={ useStubQuery }
          >
            <LayoutProvider
              key={ keyDetail.type ?? 'unknown' }
              layout={ layout }
            >
              <KeyDefinitionFormBridge
                noPadding
                onGetLayout={ handleGetLayout }
              />
            </LayoutProvider>
          </SettingsProvider>
        </AreaProvider>
      )}
    </Modal>
  )
}
