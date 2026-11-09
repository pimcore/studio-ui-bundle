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
import { Modal } from '@Pimcore/components/modal/modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { AreaProvider } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { SettingsProvider } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { LayoutProvider, useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { LayoutForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/layout-form'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import {
  type ClassificationStoreConfigurationKeyDetail,
  type ClassificationStoreConfigurationKeyUpdate,
  type ClassificationStoreKeyDefinition,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { Form, type formInstanceType } from '@sdk/components'

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
 * and exposes getLayout and the form to the parent via callback refs.
 *
 * The form instance is created here rather than in the dialog, so that it lives exactly as long
 * as the dialog body: a form kept across openings would carry the values of the key edited
 * before into the next one, because a remounted form merges its own store over the new
 * initial values.
 */
const KeyDefinitionFormBridge = ({
  noPadding,
  onGetForm,
  onGetLayout
}: {
  noPadding?: boolean
  onGetForm: (form: formInstanceType) => void
  onGetLayout: (fn: () => Layout | undefined) => void
}): React.JSX.Element => {
  const { structure, setCurrentFieldDefinitionId, setCurrentFieldDefinitionIdPath, currentFieldDefinitionId, getLayout } = useLayout()
  const [form] = Form.useForm()

  // Expose getLayout and the form upward. Both callbacks are listed: the dialog memoises them
  // with an empty dependency list, so re-running on them costs nothing today, and a caller that
  // later passes an unstable callback re-publishes the refs instead of leaving the dialog holding
  // the previous render's pair.
  useEffect(() => {
    onGetLayout(getLayout)
    onGetForm(form)
  }, [getLayout, form, onGetLayout, onGetForm])

  // Auto-select the single root field once structure is ready.
  // Also set currentFieldDefinitionIdPath so layout-form.tsx never receives null.
  useEffect(() => {
    if (structure !== undefined && currentFieldDefinitionId === null) {
      setCurrentFieldDefinitionId(structure.id)
      setCurrentFieldDefinitionIdPath([structure.id])
    }
  }, [structure, currentFieldDefinitionId, setCurrentFieldDefinitionId, setCurrentFieldDefinitionIdPath])

  return (
    <LayoutForm
      form={ form }
      noPadding={ noPadding }
    />
  )
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
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(
    serviceIds['DynamicTypes/FieldDefinitionRegistry']
  )

  // Refs to the getLayout function and the form — updated by KeyDefinitionFormBridge
  const getLayoutRef = useRef<(() => Layout | undefined) | null>(null)
  const formRef = useRef<formInstanceType | null>(null)

  const handleGetLayout = useCallback((fn: () => Layout | undefined): void => {
    getLayoutRef.current = fn
  }, [])

  const handleGetForm = useCallback((form: formInstanceType): void => {
    formRef.current = form
  }, [])

  const handleSave = async (): Promise<void> => {
    if (keyDetail === undefined || getLayoutRef.current === null || formRef.current === null) return
    const layout = getLayoutRef.current()

    // The form reaches the layout provider through a 300 ms debounce, so a save pressed inside
    // that window would send the values that predate the last change. The live form is read here.
    const definition: ClassificationStoreKeyDefinition | null = layout === undefined
      ? null
      : { ...layout, ...formRef.current.getFieldsValue(true) }

    // This dialog owns the definition and nothing else on the key, so the payload names nothing
    // else. The configured title, the description and the type are left out rather than echoed
    // back from the key the dialog was opened with: an absent title or description keeps the
    // stored one and a null type does the same, where echoing them reverts a grid cell edit made
    // while the dialog was open. The title inside the definition blob is a different value.
    const update: ClassificationStoreConfigurationKeyUpdate = {
      name: keyDetail.name,
      type: null,
      definition
    }

    const response = await updateKey({
      id: keyDetail.id,
      classificationStoreConfigurationKeyUpdate: update
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

    const defaultData = fieldDefinitionRegistry.hasDynamicType(keyDetail.type)
      ? fieldDefinitionRegistry.getDynamicType(keyDetail.type).getDefaultData({
          area: AREA,
          path: [],
          fieldDefinitions: {}
        })
      : {}

    // Merge stored definition over the defaults (stored values take priority),
    // then restore fieldType/fieldtype from keyDetail.type so the correct field
    // type is always used — even during the optimistic update window when the
    // definition blob may still reference the previous type.
    return {
      ...base,
      ...defaultData,
      ...(keyDetail.definition ?? {}),
      // Only an explicit false excludes a key, so a definition stored without the flag — or with
      // an explicit null — opens with the control on rather than reporting the key as excluded.
      indexed: keyDetail.definition?.indexed !== false,
      fieldType: keyDetail.type,
      fieldtype: keyDetail.type
    } as unknown as Layout
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
                onGetForm={ handleGetForm }
                onGetLayout={ handleGetLayout }
              />
            </LayoutProvider>
          </SettingsProvider>
        </AreaProvider>
      )}
    </Modal>
  )
}
