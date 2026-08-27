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
import { useTranslation } from 'react-i18next'
import { useElementSelectorHelper } from './provider/element-selector/use-element-selector-helper'
import { Modal } from '@Pimcore/components/modal/modal'
import { ElementSelectorContent } from './components/content/element-selector-content'
import { GlobalRowSelectionProvider } from './provider/global-row-selection/global-row-selection-provider'
import { AreaControlProvider } from './provider/area-control/area-control-provider'
import { IsElementSelectorListingProvider } from './provider/is-element-selector-listing/is-element-selector-listing-provider'
import { SelectionType } from './provider/element-selector/element-selector-provider'

export const ElementSelector = (): React.JSX.Element => {
  'use memo'
  const helper = useElementSelectorHelper()
  const { t } = useTranslation()

  return (
    <Modal
      footer={ null }
      onCancel={ () => { helper.close() } }
      open={ helper.isOpen }
      size='XL'
      title={ t(helper.config.selectionType === SelectionType.Single ? 'element-selector.title.single' : 'element-selector.title.multiple') }
    >
      <IsElementSelectorListingProvider>
        <AreaControlProvider>
          <GlobalRowSelectionProvider>
            <ElementSelectorContent />
          </GlobalRowSelectionProvider>
        </AreaControlProvider>
      </IsElementSelectorListingProvider>
    </Modal>
  )
}
