/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

  const languages = [
    '-',
    ...settings.requiredLanguages
  ]

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => {
    const selectedLanguage = batchEdit.locale ?? '-'

    return ({
      id: batchEdit.key,
      children: <Tag>{t(`asset.listing.column.${batchEdit.key}`)}</Tag>,
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
