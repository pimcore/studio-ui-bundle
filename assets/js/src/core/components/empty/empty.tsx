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
import { Empty as AntEmpty, type EmptyProps } from 'antd'

export interface IEmptyProps extends EmptyProps {}

export const Empty = (props: IEmptyProps): JSX.Element => {
  return (
    <AntEmpty { ...props } />
  )
}
