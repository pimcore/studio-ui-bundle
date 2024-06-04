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
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import {
  useStyle
} from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/cells/element-cell/element-cell.styles'

export const ElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { openAsset } = useAsset()
  const propertyData = props.row.original

  function openAssetWidget (): void {
    if (props !== undefined) {
      openAsset({
        config: {
          id: propertyData.data.id
        }
      })
    }
  }

  return (
    <>
      <div className={ [styles.link, 'default-cell__content'].join(' ') }>
        {propertyData.data !== null && (
          <Tag
            bordered={ false }
            color='processing'
            onClick={ openAssetWidget }
            title={ props.getValue() }
          >
            {propertyData.data.path}{propertyData.data.key}
          </Tag>
        )}
      </div>

      <Icon name={ 'copy-07' } />
    </>
  )
}
