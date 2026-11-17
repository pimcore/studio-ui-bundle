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
import { Icon } from '@Pimcore/components/icon/icon'

export interface SelectActionButtonProps {
  className: string
  icon: string
  label: string
  onClick: () => void
}

export const SelectActionButton = ({ className, icon, label, onClick }: SelectActionButtonProps): React.JSX.Element => (
  <button
    className={ className }
    onClick={ onClick }
    onMouseDown={ (e) => { e.preventDefault() } }
    type="button"
  >
    <Icon value={ icon } />
    <span>{label}</span>
  </button>
)
