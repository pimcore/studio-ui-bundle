/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAddModal } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal'
import { IconTextButton } from '@sdk/components'
import React from 'react'

export const AddModalTrigger = (): React.JSX.Element => {
  const { openModal } = useAddModal()

  // @todo check icon
  return (
    <IconTextButton
      icon={ { value: 'layout' } }
      onClick={ openModal }
    >
      Open Add Modal
    </IconTextButton>
  )
}
