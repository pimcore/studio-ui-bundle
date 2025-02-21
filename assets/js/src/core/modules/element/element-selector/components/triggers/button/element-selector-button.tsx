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

import { IconButton, type IconButtonProps } from '@Pimcore/components/icon-button/icon-button'
import React from 'react'
import { useElementSelector } from '../../../provider/element-selector/use-element-selector'
import { type ElementSelectorConfig } from '../../../provider/element-selector/element-selector-provider'

export interface ElementSelectorButtonProps extends Omit<IconButtonProps, 'onClick' | 'icon'> {
  elementSelectorConfig: ElementSelectorConfig
}

export const ElementSelectorButton = (props: ElementSelectorButtonProps): React.JSX.Element => {
  const { elementSelectorConfig, ...baseProps } = props
  const { open } = useElementSelector(elementSelectorConfig)

  const onClick = (): void => {
    open()
  }

  return (
    <IconButton
      { ...baseProps }
      icon={ { value: 'search' } }
      onClick={ onClick }
    />
  )
}
