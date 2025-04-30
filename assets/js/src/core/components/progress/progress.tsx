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
import { Progress as AntProgress, type ProgressProps } from 'antd'

export interface IProgressProps extends ProgressProps {}

export const Progress = (props: IProgressProps): JSX.Element => {
  return (
    <AntProgress { ...props } />
  )
}
