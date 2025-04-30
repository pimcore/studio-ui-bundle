/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { isString } from 'lodash'
import { EditView } from './edit-view'
import { useAssetGetTextDataByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './edit-container.styles'
import { isSet } from '@Pimcore/utils/helpers'
import { detectLanguageFromFilename, type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

const EditContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)

  const { asset, updateTextData } = useAssetDraft(assetContext.id)
  const { data } = useAssetGetTextDataByIdQuery({ id: assetContext.id })

  const { styles } = useStyle()

  let language: SupportedLanguage = null

  if (isString(asset?.filename)) {
    language = detectLanguageFromFilename(asset.filename)
  }

  const handleUpdateAssetStoreData = (data: string): void => {
    updateTextData(data)
  }

  return (
    <div className={ styles.relativeContainer }>
      { isSet(data) && (
      <EditView
        language={ language }
        src={ data!.data }
        updateTextData={ handleUpdateAssetStoreData }
      />
      ) }
    </div>
  )
}

export { EditContainer }
