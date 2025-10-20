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
import { GridConfigProvider } from './grid-config-provider'
import { GridConfigInner } from './grid-config-inner'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'

export const GridConfig = (): React.JSX.Element => {
  return (
    <GridConfigProvider>
      <ClassificationStoreModalProvider>
        <GridConfigInner />
      </ClassificationStoreModalProvider>
    </GridConfigProvider>
  )
}
