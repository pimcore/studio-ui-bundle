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
import { MULTI_VALUE_OWN_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-own-keys'
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
  type ClassificationStoreVariantLayout,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { Form, type formInstanceType } from '@sdk/components'
import { Alert } from 'antd'
import { MultiValueEngineContext } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-engine-context'
import {
  getMultiValueRefusals,
  narrowsDeclaration,
  type MultiValueRefusal
} from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-refusals'

interface IKeyDefinitionModalProps {
  open: boolean
  keyDetail: ClassificationStoreConfigurationKeyDetail | undefined
  onClose: () => void
  onSaved: () => void
  /** What the engine of the key's store reports it can hold; the delegate picker of a multiValue key reads it. */
  engineCapabilities?: readonly string[] | null
}

/**
 * Stable module-level area constant to avoid creating a new array reference on every render.
 */
const AREA = ['classification-store']

const INHERIT = 'inherit'
const MULTI_VALUE = 'multiValue'

/**
 * The dialog writes the delegate's own settings at the top level of the blob, and core builds the
 * delegate from the blob's `delegate` member alone: the settings are packed into it here.
 */
const withDelegateMember = (definition: ClassificationStoreKeyDefinition): ClassificationStoreKeyDefinition => {
  const record = definition as Record<string, unknown>
  const settings = Object.fromEntries(
    Object.entries(record).filter(([key, value]) => !MULTI_VALUE_OWN_KEYS.has(key) && value !== undefined)
  )

  const packed: ClassificationStoreKeyDefinition = {
    ...definition,
    // Built from the current settings alone: on open the dialog hoists every delegate member to the top level, and a delegate type change clears the old ones there, so merging the stored `delegate` back would resurrect them.
    delegate: settings,
    // Names are saved trimmed: entries address a variant by its trimmed name.
    variants: Array.isArray(definition.variants)
      ? (definition.variants as ClassificationStoreVariantLayout[]).map((variant) =>
          typeof variant?.name === 'string' ? { ...variant, name: variant.name.trim() } : variant)
      : definition.variants
  }

  return packed
}
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
  onSaved,
  engineCapabilities
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
  const [refusals, setRefusals] = useState<MultiValueRefusal[]>([])
  // The stored definition the form was seeded from, held for the same reason as the localization
  // above: the narrowing warning states what this edit takes away from what the dialog opened on,
  // and a refresh of the same key moves the cached definition while the dialog stays open.
  const [baselineDefinition, setBaselineDefinition] = useState<ClassificationStoreKeyDefinition | null>(
    () => keyDetail?.definition ?? null
  )

  // Seeded per key, not per mount: the dialog stays mounted between keys, so a key opened after
  // another one would otherwise show the state of the previous one. The baseline is seeded with
  // it, so both only move when the dialog is handed a different key.
  useEffect(() => {
    const seeded = localizationOf(keyDetail?.localized)

    setBaselineLocalization(seeded)
    setLocalization(seeded)
    setBaselineDefinition(keyDetail?.definition ?? null)
    setRefusals([])
  }, [keyDetail?.id])

  // Refs to the getLayout function and the form — updated by KeyDefinitionFormBridge
  const getLayoutRef = useRef<(() => Layout | undefined) | null>(null)
  const formRef = useRef<formInstanceType | null>(null)

  const handleGetLayout = useCallback((fn: () => Layout | undefined): void => {
    getLayoutRef.current = fn
  }, [])

  const handleGetForm = useCallback((form: formInstanceType): void => {
    formRef.current = form
  }, [])

  // The form reaches the layout provider through a 300 ms debounce, so a save pressed inside
  // that window would send the values that predate the last change. The live form is read here.
  const readDefinition = (): ClassificationStoreKeyDefinition | null => {
    const layout = getLayoutRef.current?.()

    if (layout === undefined || formRef.current === null) {
      return null
    }

    const definition: ClassificationStoreKeyDefinition = { ...layout, ...formRef.current.getFieldsValue(true) }

    return keyDetail?.type === MULTI_VALUE ? withDelegateMember(definition) : definition
  }

  const saveKey = async (): Promise<void> => {
    if (keyDetail === undefined || getLayoutRef.current === null || formRef.current === null) return
    const definition = readDefinition()

    // This dialog owns the definition and the key's localization, and nothing else on the key, so
    // the payload names nothing else. The configured title, the description and the type are left
    // out rather than echoed back from the key the dialog was opened with: an absent title or
    // description keeps the stored one and a null type does the same, where echoing them reverts a
    // grid cell edit made while the dialog was open. The title inside the definition blob is a
    // different value.
    const update: ClassificationStoreConfigurationKeyUpdate = {
      name: keyDetail.name,
      type: null,
      definition,
      // Sent only when the control moved: an absent member leaves the stored flag alone, a null clears it.
      ...(localization !== baselineLocalization ? { localized: localizedValueOf(localization) } : {})
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

  const handleSave = (): void => {
    if (keyDetail === undefined || getLayoutRef.current === null) return
    // One save at a time: a second one recomputes the stored state from the patch the first wrote.
    if (isSaving) return

    // A multiValue key without its delegate, or with a variant list core would misread, is not sent at all.
    const definition = keyDetail.type === MULTI_VALUE ? readDefinition() : null
    const found = keyDetail.type === MULTI_VALUE ? getMultiValueRefusals(definition) : []

    setRefusals(found)
    if (found.length > 0) return

    const warnings: string[] = []

    if (putsOtherLanguagesAtRisk(baselineLocalization, localization)) {
      warnings.push(t('classification-store.key-localization-confirm'))
    }

    if (keyDetail.type === MULTI_VALUE && narrowsDeclaration(baselineDefinition, definition)) {
      warnings.push(t('classification-store.multi-value.narrowing-confirm'))
    }

    // Warned about on the same baseline the payload is decided on: an untouched control is not a
    // transition, whatever the cached flag has moved to meanwhile.
    if (warnings.length === 0) {
      void saveKey()
      return
    }

    modal.confirm({
      content: (
        <>{warnings.map((warning) => <span key={ warning }>{warning}</span>)}</>
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

          {refusals.length > 0 && (
            <Alert
              message={ refusals.map((refusal) => <div key={ refusal.id + (refusal.params?.name ?? '') }>{t(refusal.id, refusal.params)}</div>) }
              type='error'
            />
          )}

          <MultiValueEngineContext.Provider value={ engineCapabilities }>
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
          </MultiValueEngineContext.Provider>
        </>
      )}
    </Modal>
  )
}
