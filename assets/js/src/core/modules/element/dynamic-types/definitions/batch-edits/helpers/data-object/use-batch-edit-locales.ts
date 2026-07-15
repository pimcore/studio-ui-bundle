/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type NamePath } from 'antd/es/form/interface'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { type BatchEdit } from '@Pimcore/modules/data-object/listing/batch-actions/batch-edit-modal/batch-edit-provider'
import { getBatchEditFieldName } from './get-batch-edit-field-name'

export interface BatchEditLocaleItem {
  locale: string | null
  name: NamePath
  hidden: boolean
  key: string
  applyInitialValue: boolean
}

export const useBatchEditLocales = (batchEdit: BatchEdit): BatchEditLocaleItem[] => {
  const settings = useSettings()

  if (!batchEdit.localizable) {
    return [{ locale: null, name: getBatchEditFieldName(batchEdit), hidden: false, key: 'default', applyInitialValue: true }]
  }

  const languages = (settings.requiredLanguages ?? []) as string[]
  const selectedLanguage = batchEdit.locale ?? languages[0]

  return languages.map((language) => ({
    locale: language,
    name: getBatchEditFieldName(batchEdit, language),
    hidden: language !== selectedLanguage,
    key: language,
    applyInitialValue: false
  }))
}
