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
import { Skeleton as AntSkeleton, type SkeletonProps } from 'antd'
import type { SkeletonInputProps } from 'antd/es/skeleton/Input'

export interface ISkeletonInputProps extends SkeletonProps, SkeletonInputProps {}

export const SkeletonInput = (props: ISkeletonInputProps): JSX.Element => {
  return (
    <AntSkeleton.Input { ...props } />
  )
}
