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
import { Sidebar } from './sidebar'
import { useSidebar } from './use-sidebar'

/**
 * A sidebar component that automatically consumes state from the SidebarProvider.
 * This component eliminates the need to manually pass props to the Sidebar component
 * when using the provider pattern.
 *
 * Must be used within a SidebarProvider.
 */
export const ProvidedSidebar = (): React.JSX.Element => {
  const { entries, buttons, sizing, highlights } = useSidebar()

  return (
    <Sidebar
      buttons={ buttons }
      entries={ entries }
      highlights={ highlights }
      sizing={ sizing }
    />
  )
}
