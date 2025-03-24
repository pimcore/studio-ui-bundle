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

import { useContext } from 'react'
import { ElementSelectorContext, type ElementSelectorData } from './element-selector-provider'
import { uuid } from '@Pimcore/utils/uuid'

export interface UseElementSelectorHelperReturn extends ElementSelectorData {
  open: () => void
  close: () => void
}

export const useElementSelectorHelper = (): UseElementSelectorHelperReturn => {
  const context = useContext(ElementSelectorContext)

  if (context === undefined) {
    throw new Error('useElementSelectorHelper must be used within a ElementSelectorProvider')
  }

  const open: UseElementSelectorHelperReturn['open'] = () => {
    context.setIsOpen(true)
    context.setRenderKey(uuid())
  }

  const close: UseElementSelectorHelperReturn['close'] = () => {
    context.setIsOpen(false)
  }

  const setConfig: UseElementSelectorHelperReturn['setConfig'] = (config) => {
    const newConfig = { ...context.config, ...config }
    context.setConfig(newConfig)
  }

  return {
    ...context,
    open,
    close,
    setConfig
  }
}
