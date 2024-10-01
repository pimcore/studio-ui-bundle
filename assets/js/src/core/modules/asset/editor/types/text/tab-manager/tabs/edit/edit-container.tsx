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

import React, { useContext } from 'react'
import { EditView } from './edit-view'
import { useAssetGetTextDataByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './edit-container.styles'
import { isSet } from '@Pimcore/utils/helpers'
import { detectLanguageFromFilename, type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

const EditContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { asset } = useAssetDraft(assetContext.id)
  const { data } = useAssetGetTextDataByIdQuery({ id: assetContext.id })
  const { styles } = useStyle()

  let language: SupportedLanguage = null
  if (typeof asset?.filename === 'string') {
    language = detectLanguageFromFilename(asset.filename)
  }

  return (
    <div className={ styles.relativeContainer }>
      { isSet(data) && (
      <EditView
        language={ language }
        src={ data!.data }
      />
      ) }
    </div>
  )
}

export { EditContainer }
