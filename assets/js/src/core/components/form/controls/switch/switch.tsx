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
import { Switch as BaseSwitch, type SwitchProps } from '@Pimcore/components/switch/switch'

// Switch doesn't need width integration as it's a fixed-size component
export const Switch = (props: SwitchProps): JSX.Element => {
  return <BaseSwitch {...props} />
}

export type { SwitchProps }
