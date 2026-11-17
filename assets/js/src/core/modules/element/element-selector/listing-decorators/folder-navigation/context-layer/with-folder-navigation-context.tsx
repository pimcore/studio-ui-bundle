/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { FolderNavigationProvider } from './provider/folder-navigation/folder-navigation-provider'

export const withFolderNavigationContext = (Component: AbstractDecoratorProps['ContextComponent']): AbstractDecoratorProps['ContextComponent'] => {
  const FolderNavigationContextComponent = (): React.JSX.Element => {
    return (
      <FolderNavigationProvider>
        <Component />
      </FolderNavigationProvider>
    )
  }

  return FolderNavigationContextComponent
}
