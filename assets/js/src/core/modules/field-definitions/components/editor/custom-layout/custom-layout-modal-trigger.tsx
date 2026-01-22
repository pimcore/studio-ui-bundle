/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCustomLayoutModal } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal'
import { IconTextButton } from '@sdk/components'
import React from 'react'

export const CustomLayoutModalTrigger = (): React.JSX.Element => {
  const { openModal } = useCustomLayoutModal()

  return (
    <IconTextButton
      icon={ { value: 'layout' } }
      onClick={ openModal }
      type="link"
    >
      Custom layouts
    </IconTextButton>
  )
}
