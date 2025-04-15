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
