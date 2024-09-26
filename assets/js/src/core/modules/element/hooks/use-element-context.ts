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

import { type ElementType } from 'types/element-type.d'
import { useContext } from 'react'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'

interface UseElementContextReturn {
  id: number
  elementType: ElementType
}

export const useElementContext = (): UseElementContextReturn => {
  const { id: assetId } = useContext(AssetContext)
  const { id: dataObjectId } = useContext(DataObjectContext)

  if (assetId !== undefined) {
    return { id: assetId, elementType: 'asset' }
  } else if (dataObjectId !== undefined) {
    return { id: dataObjectId, elementType: 'data-object' }
  }

  throw new Error('No element context found')
}
