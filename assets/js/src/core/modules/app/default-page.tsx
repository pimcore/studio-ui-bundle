/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Background } from '@Pimcore/components/background/background'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import React from 'react'
import { ClassDefinitionsProvider } from '../data-object/utils/provider/class-defintions/class-definitions-provider'
import { ElementSelectorProvider } from '@sdk/modules/element'
import { useHandleDeepLink } from './hook/use-handle-deeplink'
import { SlotRenderer } from './component-registry/slot-renderer'

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

      <SlotRenderer slot="global.feedback" />
      <div id="global-overlay-container" />
    </div>
  )
}
