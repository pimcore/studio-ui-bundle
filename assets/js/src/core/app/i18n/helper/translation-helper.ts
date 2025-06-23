/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { api as translationApi } from '@Pimcore/modules/app/translations/translations-api-slice.gen'

export const addNewTranslations = async (translations: string[]): Promise<void> => {
  const translationData = translations.map((translation) => ({
    key: translation,
    type: 'simple'
  }))

  await store.dispatch(translationApi.endpoints.translationCreate.initiate({
    createTranslation: {
      translationData
    }
  }))
}
