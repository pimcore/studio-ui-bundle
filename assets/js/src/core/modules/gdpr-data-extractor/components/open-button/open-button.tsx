/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from '@sdk/components'
import { useElementHelper } from '@sdk/modules/element'
import React from 'react'

interface OpenButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  elementType: ElementType
}

export const OpenButton = ({ id, elementType, onClick, ...iconButtonProps }: OpenButtonProps): React.JSX.Element => {
  const { openElement } = useElementHelper()

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'open-folder' } }
      onClick={ async (e) => {
        await openElement({ id, type: elementType })
        onClick?.(e)
      } }
    />
  )
}
