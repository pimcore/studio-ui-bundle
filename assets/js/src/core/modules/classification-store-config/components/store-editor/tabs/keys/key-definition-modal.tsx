/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { Text } from '@Pimcore/components/text/text'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { AreaProvider } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { SettingsProvider } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { LayoutProvider, useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { LayoutForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/layout-form'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import {
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
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

const INHERIT = 'inherit'
const LOCALIZED = 'localized'
const NOT_LOCALIZED = 'not-localized'

type KeyLocalization = typeof INHERIT | typeof LOCALIZED | typeof NOT_LOCALIZED

/** The stored tri-state as the control shows it: a null or absent flag inherits the class field's. */
const localizationOf = (localized: boolean | null | undefined): KeyLocalization => {
  if (localized === true) return LOCALIZED
  if (localized === false) return NOT_LOCALIZED

  return INHERIT
}

/** What the control sends: an explicit null for inherit, so the stored flag is cleared. */
const localizedValueOf = (localization: KeyLocalization): boolean | null => {
  if (localization === LOCALIZED) return true
  if (localization === NOT_LOCALIZED) return false

  return null
}

/** Whether a transition can leave values in other languages unreachable. */
const putsOtherLanguagesAtRisk = (from: KeyLocalization, to: KeyLocalization): boolean =>
  to !== from && to !== LOCALIZED && from !== NOT_LOCALIZED

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
  const [updateKey, { isLoading: isSaving }] = useClassificationStoreConfigurationKeyUpdateMutation()
  const modal = useFormModal()
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(
    serviceIds['DynamicTypes/FieldDefinitionRegistry']
  )

  // The stored state the control was last seeded from, held rather than read live: the key detail
  // comes from the collection cache, which a refresh of the same key can move while the dialog is
  // open. Comparing against the live flag then reported an untouched control as changed.
  const [baselineLocalization, setBaselineLocalization] = useState<KeyLocalization>(
    () => localizationOf(keyDetail?.localized)
  )
  const [localization, setLocalization] = useState<KeyLocalization>(baselineLocalization)

  // Seeded per key, not per mount: the dialog stays mounted between keys, so a key opened after
  // another one would otherwise show the state of the previous one. The baseline is seeded with
  // it, so both only move when the dialog is handed a different key.
  useEffect(() => {
    const seeded = localizationOf(keyDetail?.localized)

    setBaselineLocalization(seeded)
    setLocalization(seeded)
  }, [keyDetail?.id])

  // Ref to the getLayout function — updated by KeyDefinitionFormBridge
  const getLayoutRef = useRef<(() => Layout | undefined) | null>(null)

  const handleGetLayout = useCallback((fn: () => Layout | undefined): void => {
    getLayoutRef.current = fn
  }, [])

  const saveKey = async (): Promise<void> => {
    if (keyDetail === undefined || getLayoutRef.current === null) return
    const layout = getLayoutRef.current()

    const response = await updateKey({
      id: keyDetail.id,
      classificationStoreConfigurationKeyUpdate: {
        name: keyDetail.name,
        // Saving a definition must not touch the configured title, which is a column of its
        // own: the title carried inside the definition blob is a different value.
        title: keyDetail.title ?? null,
        description: keyDetail.description,
        type: keyDetail.type,
        definition: (layout as Record<string, unknown> | null | undefined) ?? null,
        // Sent only when the control moved: an absent member leaves the stored flag alone, a null clears it.
        ...(localization !== baselineLocalization ? { localized: localizedValueOf(localization) } : {})
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
      return
    }

    onSaved()
  }

  const handleSave = (): void => {
    if (keyDetail === undefined || getLayoutRef.current === null) return
    // One save at a time: a second one recomputes the stored state from the patch the first wrote.
    if (isSaving) return

    // Warned about on the same baseline the payload is decided on: an untouched control is not a
    // transition, whatever the cached flag has moved to meanwhile.
    if (!putsOtherLanguagesAtRisk(baselineLocalization, localization)) {
      void saveKey()
      return
    }

    modal.confirm({
      content: (
        <span>{t('classification-store.key-localization-confirm')}</span>
      ),
      okText: t('yes'),
      cancelText: t('no'),
      // Awaited, so the warning stays up until the save has answered and cannot close over it.
      onOk: async () => { await saveKey() }
    })
  }

  const localizationOptions = [
    { value: INHERIT, label: t('classification-store.key-localization.inherit') },
    { value: LOCALIZED, label: t('classification-store.key-localization.localized') },
    { value: NOT_LOCALIZED, label: t('classification-store.key-localization.not-localized') }
  ]

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
      fieldType: keyDetail.type,
      fieldtype: keyDetail.type
    } as unknown as Layout
  }

  const layout = buildLayout()

  return (
    <Modal
      confirmLoading={ isSaving }
      destroyOnClose
      okText={ t('save') }
      onCancel={ onClose }
      onOk={ handleSave }
      open={ open }
      styles={ { body: { maxHeight: '65vh', overflowY: 'auto' } } }
      title={ keyDetail !== undefined ? t('classification-store.edit-key-definition', { keyName: keyDetail.name }) : '' }
      width={ 900 }
    >
      {keyDetail !== undefined && (
        <>
          {/* outside the definition form on purpose: it is a column of the key, not part of the blob */}
          <Flex
            align='center'
            gap='small'
          >
            <Text>{t('classification-store.key-localization')}</Text>
            <Segmented
              onChange={ (value) => { setLocalization(value as KeyLocalization) } }
              options={ localizationOptions }
              value={ localization }
            />
          </Flex>

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
        </>
      )}
    </Modal>
  )
}
