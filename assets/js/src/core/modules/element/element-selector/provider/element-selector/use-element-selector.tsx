/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type ElementSelectorConfig } from './element-selector-provider'
import { useElementSelectorHelper } from './use-element-selector-helper'

export interface UseElementSelectorReturn {
  open: () => void
}

export interface UseElementSelectorProps extends ElementSelectorConfig {}

export const useElementSelector = (props: UseElementSelectorProps): UseElementSelectorReturn => {
  const helper = useElementSelectorHelper()

  const open: UseElementSelectorReturn['open'] = () => {
    helper.setConfig(props)
    helper.open()
  }

  return {
    open
  }
}
