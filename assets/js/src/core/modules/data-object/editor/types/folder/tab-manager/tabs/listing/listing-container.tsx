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
