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
import { OpenElementProvider } from '@Pimcore/modules/open-element/context/open-element-data-context'

interface IOpenElementWrapperProps {
  children: React.ReactNode
}

export const OpenElementWrapper = ({ children }: IOpenElementWrapperProps): React.JSX.Element => {
  return (
    <OpenElementProvider>
      {children}
    </OpenElementProvider>
  )
}
