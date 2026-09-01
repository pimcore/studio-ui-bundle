/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useArea } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { useOptionalUnsavedChanges } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/unsaved-changes-provider'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useRefresh } from '@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { isReservedWord } from '@Pimcore/modules/field-definitions/dynamic-types/utils/reserved-words'
import { buildPathMap, getNamesInNamespace } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, type ButtonProps, useMessage } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const NAME_FORMAT_REGEX = /^[A-Za-z][A-Za-z0-9_]*$/

interface Violation { id: string, label: string }

export const DetailSave = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useDetailUpdateMutation, useLayout } = useSettings()
  const { fieldDefinitions, setInvalidFieldDefinitionIds, structure, markClean, getIsDirty: isLayoutDirty } = useLayout()
  const { generalSettings, getIsDirty: areGeneralSettingsDirty } = useGeneralSettings()
  const [updateDetailMutation, result] = useDetailUpdateMutation()
  const { isLoading } = result
  const { refreshLayout } = useRefresh()
  const messageApi = useMessage()
  const alertModal = useAlertModal()
  const fieldDefinitionRegistry = useSettings().fieldDefinitionRegistry
  const { area } = useArea()
  const unsavedChanges = useOptionalUnsavedChanges()

  // Validate all field definitions before saving. Extracted from performSave
  // to satisfy the cognitive-complexity limit; the checks are unchanged, only
  // the duplicated `includes` dedup became a Set and the data-type name
  // checks moved into a helper.
  const collectViolations = (): { invalidDefinitions: string[], emptyNameViolations: Violation[], reservedWordViolations: Violation[], formatViolations: Violation[], duplicateViolations: Violation[] } => {
    const invalidIds = new Set<string>()
    const emptyNameViolations: Violation[] = []
    const reservedWordViolations: Violation[] = []
    const formatViolations: Violation[] = []
    const duplicateViolations: Violation[] = []

    const pathMap = structure !== undefined ? buildPathMap(structure) : {}

    // Data types only, skip localizedfields
    const checkDataTypeName = (key: string, name: string): void => {
      if (isReservedWord(name)) {
        reservedWordViolations.push({ id: key, label: name })
        invalidIds.add(key)
      }

      if (!NAME_FORMAT_REGEX.test(name)) {
        formatViolations.push({ id: key, label: name })
        invalidIds.add(key)
      }

      if (structure !== undefined) {
        const namesInNamespace = getNamesInNamespace(structure, fieldDefinitions, key, pathMap)
        const occurrences = namesInNamespace.filter(n => n === name).length
        if (occurrences > 1) {
          duplicateViolations.push({ id: key, label: name })
          invalidIds.add(key)
        }
      }
    }

    for (const [key, definition] of Object.entries(fieldDefinitions)) {
      // Skip the root layout node — its name is structural, not user-editable,
      // and it is stripped from the payload before saving anyway
      if (key === structure?.id) continue

      // @todo check if we can handle the path here
      if (fieldDefinitionRegistry.hasDynamicType(definition.fieldtype) &&
        !fieldDefinitionRegistry.getDynamicType(definition.fieldtype).isValid(definition, { area, fieldDefinitions, path: [] })) {
        invalidIds.add(key)
      }

      const name: string = typeof definition.name === 'string' ? definition.name : ''

      // All types: check for empty name
      if (name.trim() === '') {
        emptyNameViolations.push({ id: key, label: definition.fieldtype })
        invalidIds.add(key)
      }

      if (definition.datatype === 'data' && definition.fieldtype !== 'localizedfields') {
        checkDataTypeName(key, name)
      }
    }

    return { invalidDefinitions: [...invalidIds], emptyNameViolations, reservedWordViolations, formatViolations, duplicateViolations }
  }

  const performSave = async (): Promise<boolean> => {
    if (generalSettings === undefined) {
      return false
    }

    const { invalidDefinitions, emptyNameViolations, reservedWordViolations, formatViolations, duplicateViolations } = collectViolations()

    setInvalidFieldDefinitionIds(invalidDefinitions)

    const hasViolations =
      emptyNameViolations.length > 0 ||
      reservedWordViolations.length > 0 ||
      formatViolations.length > 0 ||
      duplicateViolations.length > 0 ||
      invalidDefinitions.length > 0

    if (hasViolations) {
      const content = (
        <div style={ { display: 'flex', flexDirection: 'column', gap: 8 } }>
          <span>{t('field-definitions.validation.errors-found')}</span>
          {emptyNameViolations.length > 0 && (
            <div>
              <strong>{t('field-definitions.validation.empty-name')}</strong>
              <ul>{emptyNameViolations.map(v => <li key={ v.id }>{v.label}</li>)}</ul>
            </div>
          )}
          {reservedWordViolations.length > 0 && (
            <div>
              <strong>{t('field-definitions.validation.reserved-word')}</strong>
              <ul>{reservedWordViolations.map(v => <li key={ v.id }>{v.label}</li>)}</ul>
            </div>
          )}
          {formatViolations.length > 0 && (
            <div>
              <strong>{t('field-definitions.validation.invalid-format')}</strong>
              <ul>{formatViolations.map(v => <li key={ v.id }>{v.label}</li>)}</ul>
            </div>
          )}
          {duplicateViolations.length > 0 && (
            <div>
              <strong>{t('field-definitions.validation.duplicate-name')}</strong>
              <ul>{duplicateViolations.map(v => <li key={ v.id }>{v.label}</li>)}</ul>
            </div>
          )}
        </div>
      )

      alertModal.error({ content })
      return false
    }

    try {
      await updateDetailMutation({}).unwrap()
    } catch (e) {
      trackError(new ApiError(e as FetchBaseQueryError))
      return false
    }

    // Re-fetch general settings/layout: the save response may not carry every
    // server-side normalized/computed value, so the cache patch alone isn't
    // always enough to show the true post-save state.
    await refreshLayout()

    // The saved state is the new clean baseline for unsaved-changes checks
    markClean()
    messageApi.success(t('field-definitions.saved-successfully'))
    return true
  }

  // When rendered inside the custom layout modal, this detail view is the
  // modal's unsaved-changes handler. Registered without a dependency array
  // so the guard always sees the latest closures; outside the modal this
  // is a no-op.
  useEffect(() => unsavedChanges?.register({
    isDirty: () => isLayoutDirty() || areGeneralSettingsDirty(),
    save: performSave
  }))

  const onClick: ButtonProps['onClick'] = () => {
    void performSave()
  }

  return (
    <Button
      disabled={ isLoading || generalSettings === undefined }
      loading={ isLoading }
      onClick={ onClick }
      type="primary"
    >
      {t('save')}
    </Button>
  )
}
