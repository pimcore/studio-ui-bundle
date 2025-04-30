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
import type { SkeletonButtonProps } from 'antd/es/skeleton/Button'

export interface ISkeletonButtonProps extends SkeletonProps, SkeletonButtonProps {}

export const SkeletonButton = (props: ISkeletonButtonProps): JSX.Element => {
  return (
    <AntSkeleton.Button { ...props } />
  )
}
