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