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

import { type DefaultCellProps } from '../../default-cell'
import React from 'react'
import { useStyle } from './open-element-cell.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'
import { Button } from '@Pimcore/components/button/button'

export const OpenElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { openAsset } = useAssetHelper()
  const propertyType = props.row.original.type
  const elementId = props.row.original.id

  function renderCell (): React.JSX.Element {
    let onClick = (): void => {
      console.log('not implemented yet')
    }

    switch (propertyType) {
      case 'document':
        onClick = (): void => {
          console.error('opening "document" is not supported yet')
        }
        break
      case 'asset':
        onClick = (): void => {
          openAsset({
            config: {
              id: elementId
            }
          })
        }
        break
      case 'object':
      case 'dataObject':
        onClick = (): void => {
          console.error('opening "objects" is not supported yet')
        }
        break
    }

    return (
      <Button
        icon={ <Icon name={ 'group' } /> }
        onClick={ onClick }
        onKeyDown={ onKeyEnterExecuteClick }
        type={ 'link' }
      />
    )
  }

  return (
    <div className={ styles.cell }>
      {renderCell()}
    </div>
  )
}
