/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef, useCallback } from 'react'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useColumnMapper, type UseColumnMapperReturn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-column-mapper'
import { uuid } from '@Pimcore/utils/uuid'

export const useDataObjectColumnMapper = (): UseColumnMapperReturn => {
  const languageSelection = useLanguageSelection()
  const currentLanguageRef = useRef(languageSelection.currentLanguage)
  const { shouldMapDataToColumn: baseShouldMapDataToColumn, encodeColumnIdentifier: baseEncodeColumnIdentifier, decodeColumnIdentifier: baseDecodeColumnIdentifier, ...props } = useColumnMapper()
  currentLanguageRef.current = languageSelection.currentLanguage

  const shouldMapDataToColumn: UseColumnMapperReturn['shouldMapDataToColumn'] = useCallback((data, column) => {
    const currentLanguage = currentLanguageRef.current

    // Every "advanced" column instance is added from a shared template and its `key` is
    // only ever set to the (optional, user-editable) title, so it is not guaranteed to be
    // unique - two columns with a blank or identical title would otherwise collide onto
    // the same row value here (https://github.com/pimcore/service-operations/issues/927).
    // Match by the stable per-instance id instead.
    if (column.type === 'dataobject.advanced') {
      const uniqueId = column.originalApiDefinition?.__meta?.uniqueId
      // Mirror use-data-query-helper.ts: a null/undefined locale is resolved to the
      // current UI language before the request is sent, so the response echoes back
      // that resolved locale rather than null.
      const expectedLocale = (column.locale === null || column.locale === undefined) ? currentLanguage : column.locale
      return data.key === uniqueId && data.locale === expectedLocale
    }

    if (column.type === 'dataobject.classificationstore') {
      const dataKey = data.key.split('.')[0]

      if (column.localizable && column.locale === 'default') {
        return dataKey === column.key && data.additionalAttributes?.keyId === column.config?.keyId && data.additionalAttributes?.groupId === column.config?.groupId && data.locale === null
      }

      if (column.localizable && (column.locale === null || column.locale === undefined)) {
        return dataKey === column.key && data.additionalAttributes?.keyId === column.config?.keyId && data.additionalAttributes?.groupId === column.config?.groupId && data.locale === currentLanguage
      }

      if (column.localizable) {
        return dataKey === column.key && data.additionalAttributes?.keyId === column.config?.keyId && data.additionalAttributes?.groupId === column.config?.groupId && data.locale === column.locale
      }

      return dataKey === column.key && data.additionalAttributes?.keyId === column.config?.keyId && data.additionalAttributes?.groupId === column.config?.groupId
    }

    if (column.localizable && (column.locale === null || column.locale === undefined)) {
      return data.key === column.key && currentLanguage === data.locale
    }

    return baseShouldMapDataToColumn(data, column)
  }, [baseShouldMapDataToColumn])

  const encodeColumnIdentifier: UseColumnMapperReturn['encodeColumnIdentifier'] = useCallback((column) => {
    if (column.type === 'dataobject.classificationstore') {
      return JSON.stringify({
        uuid: uuid(),
        key: column.key,
        keyId: column.config?.keyId,
        groupId: column.config?.groupId,
        locale: column.locale ?? null,
        type: column.type.replaceAll('.', '*||*')
      })
    }

    if (column.type === 'dataobject.advanced') {
      return JSON.stringify({
        uuid: uuid(),
        uniqueId: column.originalApiDefinition?.__meta?.uniqueId,
        locale: column.locale ?? null,
        type: column.type.replaceAll('.', '*||*')
      })
    }

    return baseEncodeColumnIdentifier(column)
  }, [baseEncodeColumnIdentifier])

  const decodeColumnIdentifier: UseColumnMapperReturn['decodeColumnIdentifier'] = useCallback((columnIdentifier, selectedColumns) => {
    try {
      JSON.parse(columnIdentifier)
    } catch (e) {
      return undefined
    }

    const data = JSON.parse(columnIdentifier)
    const type = data.type?.replaceAll('*||*', '.')

    if (type === 'dataobject.classificationstore') {
      return selectedColumns.find((column) => column.key === data.key && column.type === 'dataobject.classificationstore' && column.config?.keyId === data.keyId && column.config?.groupId === data.groupId && (column.locale ?? null) === data.locale)
    }

    if (type === 'dataobject.advanced') {
      return selectedColumns.find((column) => column.type === 'dataobject.advanced' && column.originalApiDefinition?.__meta?.uniqueId === data.uniqueId && (column.locale ?? null) === data.locale)
    }

    return baseDecodeColumnIdentifier(columnIdentifier, selectedColumns)
  }, [baseDecodeColumnIdentifier])

  return {
    ...props,
    decodeColumnIdentifier,
    encodeColumnIdentifier,
    shouldMapDataToColumn
  }
}
