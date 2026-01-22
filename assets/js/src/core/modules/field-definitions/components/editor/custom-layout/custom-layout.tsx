/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CurrentConfigurationProvider } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/current-configuration-provider'
import { CustomLayoutModal, CustomLayoutModalProvider } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal'
import { CustomLayoutModalTrigger } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-trigger'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import React from 'react'

export const CustomLayout = (): React.JSX.Element => {
  const { activeConfiguration } = useItems()

  return (
    <CurrentConfigurationProvider configuration={ activeConfiguration }>
      <CustomLayoutModalProvider>
        <CustomLayoutModal />
        <CustomLayoutModalTrigger />
      </CustomLayoutModalProvider>
    </CurrentConfigurationProvider>
  )
}
