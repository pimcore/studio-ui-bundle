/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { useKeyedList } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list'
import { Tag } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useClassificationStoreFieldPicker } from './classification-store-field-picker-provider'

export interface ResolvedClassificationStoreField {
  storeId: number
  /** Class id the picked group/key relations should be scoped to (e.g. the related class for relation fields). */
  classId?: string
}

export interface ClassificationStoreFieldActionsConfig {
  /**
   * Resolves the classification store descriptor for a given field key, or `undefined` when the
   * field is not a classification store field.
   */
  resolveField: (fieldKey: string) => ResolvedClassificationStoreField | undefined
}

export interface ClassificationStoreFieldActions {
  /** Drops any stored group/key for this source field. */
  clearValue: () => void
  /** Opens the single-select picker for the given field key (when it is a classification store field). */
  openFor: (fieldKey: string) => void
  /** Handler for the field select: clears the group/key picked for the previously selected field. */
  onFieldSelect: () => void
}

/**
 * Wires the classification store picker into a single advanced column source field. The returned
 * handlers persist the picked group/key into the source field config and are safe to use both from
 * the field select (`onFieldSelect`) and from an explicit edit affordance (`openFor`).
 */
export const useClassificationStoreFieldActions = ({ resolveField }: ClassificationStoreFieldActionsConfig): ClassificationStoreFieldActions => {
  const { name } = useItem()
  const { operations } = useKeyedList()
  const { openPicker } = useClassificationStoreFieldPicker()

  const namePath = useMemo(() => (Array.isArray(name) ? name : [name]), [name])

  const clearValue = useCallback((): void => {
    operations.update([...namePath, 'groupId'], undefined, false)
    operations.update([...namePath, 'keyId'], undefined, false)
    operations.update([...namePath, 'keyName'], undefined, false)
  }, [operations, namePath])

  const openFor = useCallback((fieldKey: string): void => {
    const resolved = resolveField(fieldKey)
    if (resolved === undefined) {
      return
    }

    openPicker({
      storeId: resolved.storeId,
      classId: resolved.classId,
      fieldName: fieldKey,
      onPick: (value) => {
        operations.update([...namePath, 'groupId'], value.groupId, false)
        operations.update([...namePath, 'keyId'], value.keyId, false)
        operations.update([...namePath, 'keyName'], value.keyName, false)
      }
    })
  }, [resolveField, openPicker, operations, namePath])

  const onFieldSelect = useCallback((): void => {
    // A different field was picked: drop any group/key picked for the previous field. The value for
    // the new field is chosen explicitly via the edit affordance.
    clearValue()
  }, [clearValue])

  return { clearValue, openFor, onFieldSelect }
}

export interface ClassificationStoreValueControlProps extends ClassificationStoreFieldActionsConfig {}

/**
 * Renders the picked classification store value for a single advanced column source field as a chip
 * with an edit affordance. Renders nothing while the selected field is not a classification store
 * field.
 */
export const ClassificationStoreValueControl = ({ resolveField }: ClassificationStoreValueControlProps): React.JSX.Element | null => {
  const { name } = useItem()
  const { openFor } = useClassificationStoreFieldActions({ resolveField })
  const { t } = useTranslation()

  const namePath = useMemo(() => (Array.isArray(name) ? name : [name]), [name])

  const currentField: string | undefined = Form.useWatch([...namePath, 'field'])
  const keyId: number | undefined = Form.useWatch([...namePath, 'keyId'])
  const keyName: string | undefined = Form.useWatch([...namePath, 'keyName'])

  const isClassificationStoreField = currentField !== undefined && resolveField(currentField) !== undefined

  if (!isClassificationStoreField) {
    return null
  }

  return (
    <Box padding={ { top: 'mini', bottom: 'none', x: 'none' } }>
      <Flex
        align="center"
        gap="mini"
      >
        {keyId !== undefined && keyId !== null
          ? <Tag>{keyName ?? String(keyId)}</Tag>
          : <Text type="secondary">{t('grid.advanced-column.classification-store.no-selection')}</Text>}

        <IconButton
          icon={ { value: 'edit', colorToken: 'colorPrimary' } }
          onClick={ () => { openFor(currentField) } }
          theme="secondary"
          tooltip={ { title: t('grid.advanced-column.classification-store.edit') } }
        />
      </Flex>
    </Box>
  )
}
