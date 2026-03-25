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
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { isReservedWord } from '@Pimcore/modules/field-definitions/dynamic-types/utils/reserved-words'
import { buildPathMap, getNamesInNamespace } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Button, type ButtonProps, useMessage } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NAME_FORMAT_REGEX = /^[A-Za-z][A-Za-z0-9_]*$/

export const DetailSave = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useDetailUpdateMutation, useLayout } = useSettings()
  const { fieldDefinitions, setInvalidFieldDefinitionIds, structure } = useLayout()
  const { generalSettings } = useGeneralSettings()
  const [updateDetailMutation, result] = useDetailUpdateMutation()
  const { isLoading } = result
  const messageApi = useMessage()
  const alertModal = useAlertModal()
  const fieldDefinitionRegistry = useSettings().fieldDefinitionRegistry
  const { area } = useArea()

  const onClick: ButtonProps['onClick'] = () => {
    if (generalSettings === undefined) {
      return
    }

    const invalidDefinitions: string[] = []

    interface Violation { id: string, label: string }
    const emptyNameViolations: Violation[] = []
    const reservedWordViolations: Violation[] = []
    const formatViolations: Violation[] = []
    const duplicateViolations: Violation[] = []

    const pathMap = structure !== undefined ? buildPathMap(structure) : {}

    // Validate all field definitions before saving
    for (const [key, definition] of Object.entries(fieldDefinitions)) {
      // Skip the root layout node — its name is structural, not user-editable,
      // and it is stripped from the payload before saving anyway
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (structure !== undefined && key === structure.id) continue
      if (fieldDefinitionRegistry.hasDynamicType(definition.fieldtype)) {
        const dynamicType = fieldDefinitionRegistry.getDynamicType(definition.fieldtype)
        // @todo check if we can handle the path here
        const isValid = dynamicType.isValid(definition, { area, fieldDefinitions, path: [] })

        if (!isValid) {
          invalidDefinitions.push(key)
        }
      }

      const name: string = typeof definition.name === 'string' ? definition.name : ''

      // All types: check for empty name
      if (name.trim() === '') {
        emptyNameViolations.push({ id: key, label: definition.fieldtype })
        if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key)
      }

      // Data types only, skip localizedfields
      if (definition.datatype === 'data' && definition.fieldtype !== 'localizedfields') {
        if (isReservedWord(name)) {
          reservedWordViolations.push({ id: key, label: name })
          if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key)
        }

        if (!NAME_FORMAT_REGEX.test(name)) {
          formatViolations.push({ id: key, label: name })
          if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key)
        }

        if (structure !== undefined) {
          const namesInNamespace = getNamesInNamespace(structure, fieldDefinitions, key, pathMap)
          const occurrences = namesInNamespace.filter(n => n === name).length
          if (occurrences > 1) {
            duplicateViolations.push({ id: key, label: name })
            if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key)
          }
        }
      }
    }

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
      return
    }

    updateDetailMutation({}).unwrap()
      .then(() => {
        messageApi.success(t('field-definitions.saved-successfully'))
      })
      .catch((e) => {
        trackError(new ApiError(e as FetchBaseQueryError))
      })
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
