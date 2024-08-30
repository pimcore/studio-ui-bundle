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
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'
import { Button } from '@Pimcore/components/button/button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'

export const OpenElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { openElement, mapToElementType } = useElementHelper()
  const elementType = mapToElementType(props.row.original.type as string)
  const elementId = props.row.original.id

  function renderCell (): React.JSX.Element {
    const onClick = async (): Promise<void> => {
      await openElement({
        id: elementId,
        type: elementType
      })
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
