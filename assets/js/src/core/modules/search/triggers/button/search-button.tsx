/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import React from 'react'
import { useSearch } from '../../provider/use-search'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

export const SearchButton = (): React.JSX.Element => {
  const { open } = useSearch()

  useHandleKeyBindings(() => { open('all') }, 'quickSearch', true)
  useHandleKeyBindings(() => { open(elementTypes.asset) }, 'searchAsset', true, UserPermission.Assets)
  useHandleKeyBindings(() => { open(elementTypes.dataObject) }, 'searchObject', true, UserPermission.Objects)
  useHandleKeyBindings(() => { open(elementTypes.document) }, 'searchDocument', true, UserPermission.Documents)

  return (
    <IconButton
      data-testid="search-button"
      icon={ { value: 'search' } }
      onClick={ () => { open('all') } }
      type='text'
    />
  )
}
