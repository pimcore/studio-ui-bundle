/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Space } from 'antd'
import { type SpaceCompactProps } from 'antd/es/space/Compact'
import React from 'react'

interface CompactProps extends SpaceCompactProps {
}

export const Compact = (props: CompactProps): React.JSX.Element => {
  return (
    <Space.Compact { ...props } />
  )
}
