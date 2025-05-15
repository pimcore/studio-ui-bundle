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
import { useElementSelectorHelper } from './provider/element-selector/use-element-selector-helper'
import { Modal } from '@Pimcore/components/modal/modal'
import { ElementSelectorContent } from './components/content/element-selector-content'
import { GlobalRowSelectionProvider } from './provider/global-row-selection/global-row-selection-provider'
import { AreaControlProvider } from './provider/area-control/area-control-provider'

export const ElementSelector = (): React.JSX.Element => {
  const helper = useElementSelectorHelper()

  return (
    <Modal
      footer={ null }
      onCancel={ () => { helper.close() } }
      open={ helper.isOpen }
      size='XL'
      title={ null }
    >
      <AreaControlProvider>
        <GlobalRowSelectionProvider>
          <ElementSelectorContent />
        </GlobalRowSelectionProvider>
      </AreaControlProvider>
    </Modal>
  )
}
