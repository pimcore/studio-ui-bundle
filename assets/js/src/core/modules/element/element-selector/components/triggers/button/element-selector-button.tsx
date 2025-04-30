/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
