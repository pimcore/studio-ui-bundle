/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CustomLayoutModal } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal'
import { CustomLayoutModalProvider } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-provider'
import { CustomLayoutModalTrigger } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-trigger'
import React from 'react'

export const CustomLayout = (): React.JSX.Element => {
  return (
    <CustomLayoutModalProvider>
      <CustomLayoutModalTrigger />
      <CustomLayoutModal />
    </CustomLayoutModalProvider>
  )
}
