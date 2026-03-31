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
import { DataObjectContextMenuOptionsPanel } from './data-object-context-menu-options-panel'
import { AssetContextMenuOptionsPanel } from './asset-context-menu-options-panel'
import { DocumentContextMenuOptionsPanel } from './document-context-menu-options-panel'
import { useWidgetTypeForm } from '../../hooks/use-widget-type-form'

export const AllowedContextMenuPanel = (): React.JSX.Element => {
  const { dataObjectContextMenuItems, assetContextMenuItems, documentContextMenuItems, isLoading } = useWidgetTypeForm()

  return (
    <>
      <DataObjectContextMenuOptionsPanel
        isLoading={ isLoading }
        items={ dataObjectContextMenuItems }
      />
      <AssetContextMenuOptionsPanel
        isLoading={ isLoading }
        items={ assetContextMenuItems }
      />
      <DocumentContextMenuOptionsPanel
        isLoading={ isLoading }
        items={ documentContextMenuItems }
      />
    </>
  )
}
