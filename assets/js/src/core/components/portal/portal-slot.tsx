/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type HTMLAttributes } from 'react'

interface IPortalSlotProps extends HTMLAttributes<HTMLDivElement> {
  id: string
}

export const PortalSlot = ({ id, ...props }: IPortalSlotProps): React.JSX.Element => {
  return (
    <div
      id={ id }
      { ...props }
    />
  )
}
