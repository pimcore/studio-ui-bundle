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

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits, removeBatchEdit } = useBatchEdit()
  const { updateLocale } = useBatchEdit()
  const form = Form.useFormInstance()

  // Localized values are stored in the form under ['localizedfields', key, locale] and the
  // whole form tree is submitted. Changing a row's locale remounts the field at a new path, so
  // carry the value over to the new locale (and clear the old one). Only regular localizable
  // fields use this path; classification-store / object-brick build their own name paths.
  const migrateLocaleValue = (batchEdit: BatchEdit, nextLocale: string | null): void => {
    const isRegularLocalizable = batchEdit.localizable &&
      batchEdit.type !== 'dataobject.classificationstore' &&
      batchEdit.type !== 'dataobject.objectbrick'

    if (!isRegularLocalizable || batchEdit.locale == null || nextLocale == null || nextLocale === batchEdit.locale) {
      return
    }

    const oldPath = ['localizedfields', batchEdit.key, batchEdit.locale]
    const newPath = ['localizedfields', batchEdit.key, nextLocale]
    form.setFieldValue(newPath, form.getFieldValue(oldPath))
    form.setFieldValue(oldPath, undefined)
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
    const key = batchEdit.localizable ? `${baseKey}-${batchEdit.locale ?? ''}` : baseKey

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
              removeBatchEdit(batchEdit)
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
