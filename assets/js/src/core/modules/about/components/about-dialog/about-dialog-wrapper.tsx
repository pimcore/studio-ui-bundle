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
import { AboutDialog } from './about-dialog'
import { AboutDialogProvider } from '@Pimcore/modules/about/components/about-dialog/context/about-dialog-data-context'

interface IAboutDialogWrapperProps {
  children: React.ReactNode
}

export const AboutDialogWrapper = ({ children }: IAboutDialogWrapperProps): React.JSX.Element => {
  return (
    <AboutDialogProvider>
      {children}
      <AboutDialog />
    </AboutDialogProvider>
  )
}
