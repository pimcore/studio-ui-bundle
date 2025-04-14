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

import { Background } from '@Pimcore/components/background/background'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import React from 'react'
import { ClassDefinitionsProvider } from '../data-object/utils/provider/class-defintions/class-definitions-provider'
import { ElementSelectorProvider } from '../element/element-selector/provider/element-selector/element-selector-provider'
import { useHandleDeepLink } from './hook/use-handle-deeplink'

export const DefaultPage = (): React.JSX.Element => {
  useHandleDeepLink()

  const preventDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  return (
    <div
      onDragOver={ preventDrop }
      onDrop={ preventDrop }
    >
      <Background />
      <ClassDefinitionsProvider>
        <ElementSelectorProvider>
          <BaseLayoutView />
        </ElementSelectorProvider>
      </ClassDefinitionsProvider>
    </div>
  )
}
