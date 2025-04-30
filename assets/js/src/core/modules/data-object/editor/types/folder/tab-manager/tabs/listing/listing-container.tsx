/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ListingContainer as ObjectListing } from '@Pimcore/modules/data-object/listing/listing-container'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export const ListingContainer = (): React.JSX.Element => {
  return (
    <ObjectListing />
  )
}

export const TAB_LISTING: IEditorTab = {
  key: 'listing',
  label: 'folder.folder-editor-tabs.view',
  children: <ListingContainer />,
  icon: <Icon value={ 'list' } />,
  isDetachable: false
}
