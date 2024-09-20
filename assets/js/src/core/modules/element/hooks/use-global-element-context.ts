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

import { type GlobalAssetContext, useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import {
  type GlobalDataObjectContext,
  useGlobalDataObjectContext
} from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'

interface UseGlobalElementContext {
  context: GlobalAssetContext | GlobalDataObjectContext | undefined
}

export const useGlobalElementContext = (): UseGlobalElementContext => {
  const { context: assetContext } = useGlobalAssetContext()
  const { context: dataObjectContext } = useGlobalDataObjectContext()

  return {
    context: assetContext ?? dataObjectContext
  }
}
