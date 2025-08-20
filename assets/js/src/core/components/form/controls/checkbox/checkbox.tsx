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
import { Checkbox as BaseCheckbox, type ICheckboxProps } from '@Pimcore/components/checkbox/checkbox'

// Checkbox doesn't need width integration as it's a fixed-size component
export const Checkbox = (props: ICheckboxProps): JSX.Element => {
  return <BaseCheckbox { ...props } />
}

// Re-export the Group component
Checkbox.Group = BaseCheckbox.Group

export type { ICheckboxProps }
