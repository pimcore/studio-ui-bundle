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

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Tag } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export const ElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyData = props.row.original

  return (
    <>
      <div>
        {propertyData.data !== null && (
          <Tag
            bordered={ false }
            color='processing'
          >
              {propertyData.data.path}
          </Tag>
        )}
      </div>

      <Icon name={ 'copy-07' } />
    </>
  )
}
