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
import { LanguageSelection, transformLanguage } from '@Pimcore/components/language-selection/language-selection'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useBatchEdit } from './hooks/use-batch-edit'
import { DefaultBatchEdit } from './default-batch-edit'

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits, removeBatchEdit } = useBatchEdit()
  const { updateLocale } = useBatchEdit()
  const settings = useSettings()

  const languages = settings.requiredLanguages

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => {
    // @todo infer selected language from grid config when available
    const selectedLanguage = batchEdit.locale ?? settings.requiredLanguages[0]

    return ({
      id: batchEdit.key,
      children: <Tag>{t(`${batchEdit.key}`)}</Tag>,
      renderRightToolbar: <ButtonGroup items={
        [...(batchEdit.localizable
          ? [
            <LanguageSelection
              key="language-selection"
              languages={ languages }
              onSelectLanguage={ (language) => {
                updateLocale(batchEdit.key, transformLanguage(language))
              } }
              selectedLanguage={ selectedLanguage }
            />
            ]
          : []),
          <IconButton
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => {
              removeBatchEdit(batchEdit.key)
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
