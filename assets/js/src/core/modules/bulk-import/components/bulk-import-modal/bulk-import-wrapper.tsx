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
import { BulkImportProvider } from './context/bulk-import-context'
import { BulkImportModalHolder } from './bulk-import-modal-holder'

interface IBulkImportWrapperProps {
  children: React.ReactNode
}

export const BulkImportWrapper = ({ children }: IBulkImportWrapperProps): React.JSX.Element => {
  return (
    <BulkImportProvider>
      {children}
      <BulkImportModalHolder />
    </BulkImportProvider>
  )
}
