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

import React, { type RefObject, useEffect, useImperativeHandle, useRef } from 'react'
import { type CardProps as AntdCardProps } from 'antd'

export interface CardProps extends AntdCardProps {
  loading?: boolean
}

const Component = ({ loading, children, className, ...props }: CardProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  return (
    <div>test</div>
  )
}

export const Card = React.forwardRef(Component)
