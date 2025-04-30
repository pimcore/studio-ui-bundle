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
import { Divider as AntDivider, type DividerProps } from 'antd'

export interface IDividerProps extends DividerProps {}

export const Divider = (props: IDividerProps): JSX.Element => {
  return (
    <AntDivider { ...props } />
  )
}
