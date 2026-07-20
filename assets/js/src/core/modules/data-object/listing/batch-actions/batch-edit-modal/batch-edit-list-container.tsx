/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Tag } from 'antd'
import { type NamePath } from 'antd/es/form/interface'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { t } from 'i18next'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import { Form } from '@Pimcore/components/form/form'
import { useBatchEdit } from './hooks/use-batch-edit'
import { type BatchEdit } from './batch-edit-provider'
import { areGroupsEqual } from './utils/dropdown-filter'
import { DefaultBatchEdit } from './default-batch-edit'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'

// The form path a row's value is stored under, matching each renderer's Form.Item name.
// Object-brick builds a non-trivial path and is skipped (null) — its value isn't migrated/cleared.
const getFormPath = (batchEdit: BatchEdit, locale: string | null): NamePath | null => {
  if (batchEdit.type === 'dataobject.objectbrick') {
    return null
  }

  if (batchEdit.type === 'dataobject.classificationstore') {
    const config = batchEdit.config as { keyId?: number, groupId?: number }
    return [batchEdit.key, `${config.groupId}`, locale ?? 'default', `${config.keyId}`]
  }

  return batchEdit.localizable ? ['localizedfields', batchEdit.key, locale ?? ''] : [batchEdit.key]
}

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits, removeBatchEdit, updateLocale } = useBatchEdit()
  const form = Form.useFormInstance()

  // Changing a row's locale remounts its field at a new path; carry the value over (and clear the
  // old path) so the whole-form submit doesn't drop it. Object-brick is skipped (see getFormPath).
  const migrateLocaleValue = (batchEdit: BatchEdit, nextLocale: string | null): void => {
    if (!batchEdit.localizable || (batchEdit.locale ?? null) === (nextLocale ?? null)) {
      return
    }

    const oldPath = getFormPath(batchEdit, batchEdit.locale ?? null)
    const newPath = getFormPath(batchEdit, nextLocale)

    if (oldPath == null || newPath == null) {
      return
    }

    form.setFieldValue(newPath, form.getFieldValue(oldPath))
    form.setFieldValue(oldPath, undefined)
  }

  // Ant Form preserves unmounted values, so clear the removed row's path before dropping it,
  // otherwise a re-added locale would show the stale value.
  const handleRemove = (batchEdit: BatchEdit): void => {
    const path = getFormPath(batchEdit, batchEdit.locale ?? null)

    if (path != null) {
      form.setFieldValue(path, undefined)
    }

    removeBatchEdit(batchEdit)
  }

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => {
    // A localizable field can have one row per locale. Exclude locales already used by the
    // field's other rows so the same locale can't be picked twice.
    const usedByOtherRows = batchEdit.type === 'dataobject.classificationstore'
      ? []
      : batchEdits
          .filter(edit => edit.key === batchEdit.key && areGroupsEqual(edit.group, batchEdit.group) && edit.locale !== batchEdit.locale)
          .map(edit => edit.locale)
          .filter((locale): locale is string => locale !== null)

    const batchEditTitle = hasFieldDefinition(batchEdit.config) ? (batchEdit.config.fieldDefinition as { title: string }).title : batchEdit.key
    const baseKey = batchEdit.type === 'dataobject.classificationstore' ? `${batchEdit.key}-${(batchEdit.config as { keyId: number }).keyId}-${(batchEdit.config as { groupId: number }).groupId}` : batchEdit.key
    // Include the group so two columns with the same key/locale in different groups stay distinct.
    const key = JSON.stringify({ group: batchEdit.group, baseKey, locale: batchEdit.localizable ? batchEdit.locale ?? null : null })

    return ({
      id: key,
      key,
      children: <Tag>{t(`${batchEditTitle}`)}</Tag>,
      renderRightToolbar: <ButtonGroup items={
        [...(batchEdit.localizable
          ? [
            <PermissionBasedLanguageSelectionControl
              customKeys={ batchEdit.type === 'dataobject.classificationstore' ? ['default'] : [] }
              excludeLocales={ usedByOtherRows }
              key="language-selection"
              onChange={ (language) => {
                migrateLocaleValue(batchEdit, language)
                updateLocale(batchEdit, language)
              } }
              value={ batchEdit.locale }
            />
            ]
          : []),
          <IconButton
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => {
              handleRemove(batchEdit)
            } }
          />
        ]
      }
                          />,
      body: <DefaultBatchEdit batchEdit={ batchEdit } />
    })
  })

  return (
    <>
      {items.length === 0 && <NoContent text={ t('batch-edit.no-content') } />}
      {items.length > 0 && <StackList items={ items } />}
    </>
  )
}
