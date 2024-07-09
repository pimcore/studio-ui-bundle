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
import { useGlobalAssetContext } from '../../hooks/use-global-asset-context'
import { AssetProvider } from '../../asset-provider'

interface IDetachedTabProps {
  children: React.ReactNode
}

export const DetachedTab = ({ children }: IDetachedTabProps): React.JSX.Element => {
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <div>Missing context</div>
  }

  return (
    <AssetProvider id={ context.config.id }>
      {children}
    </AssetProvider>
  )
}
