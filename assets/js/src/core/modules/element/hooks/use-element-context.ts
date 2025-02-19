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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useContext } from 'react'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface UseElementContextReturn {
  id: number
  elementType: ElementType
}

export const useElementContext = (): UseElementContextReturn => {
  const elementContext = useOptionalElementContext()

  if (elementContext !== null) {
    return elementContext
  }

  const errorMessage = 'No element context found'

  trackError(new GeneralError(errorMessage))
  throw new Error(errorMessage)
}

export const useOptionalElementContext = (): UseElementContextReturn | null => {
  const { id: assetId } = useContext(AssetContext)
  const { id: dataObjectId } = useContext(DataObjectContext)

  if (assetId !== 0) {
    return { id: assetId, elementType: 'asset' }
  } else if (dataObjectId !== 0) {
    return { id: dataObjectId, elementType: 'data-object' }
  } else {
    return null
  }
}
