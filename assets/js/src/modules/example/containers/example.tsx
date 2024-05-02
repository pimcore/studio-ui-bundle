/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React from 'react'
import { Result } from 'antd'
import { AssetContainer } from './asset-container'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'

export const Example = (): React.JSX.Element => {
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  return (
    <AssetContainer id={ context.config.id } />
  )
}
