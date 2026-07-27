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
import { areGroupsEqual } from './utils/dropdown-filter'
import { DefaultBatchEdit } from './default-batch-edit'

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits, removeBatchEdit } = useBatchEdit()
  const { updateLocale } = useBatchEdit()

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => {
    const siblingLocales = batchEdit.localizable
      ? batchEdits
          .filter(edit => edit.rowId !== batchEdit.rowId && edit.key === batchEdit.key && areGroupsEqual(edit.group, batchEdit.group))
          .map(edit => edit.locale ?? null)
      : []
    const usedByOtherRows = siblingLocales.filter((locale): locale is string => locale !== null)
    const isNullUsedByOtherRows = siblingLocales.includes(null)

    const body = (
      <Form.Group name={ [batchEdit.rowId] }>
        <DefaultBatchEdit batchEdit={ batchEdit } />
      </Form.Group>
    )

    return ({
      id: batchEdit.rowId,
      key: batchEdit.rowId,
      children: <Tag>{t(`${batchEdit.key}`)}</Tag>,
      renderRightToolbar: <ButtonGroup items={
        [...(batchEdit.localizable
          ? [
            <PermissionBasedLanguageSelectionControl
              excludeLocales={ usedByOtherRows }
              isNullable={ !isNullUsedByOtherRows }
              key="language-selection"
              onChange={ (language) => {
                updateLocale(batchEdit, language)
              } }
              value={ batchEdit.locale ?? null }
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
      body
    })
  })

  return (
    <>
      {items.length === 0 && <NoContent text={ t('batch-edit.no-content') } />}
      {items.length > 0 && <StackList items={ items } />}
    </>
  )
}
