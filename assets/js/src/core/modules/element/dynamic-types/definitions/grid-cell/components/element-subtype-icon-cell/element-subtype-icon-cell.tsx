/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { capitalize } from 'lodash'
import React from 'react'
import { useStyle } from './element-subtype-icon-cell.styles'

export interface ElementSubtypeIconCellProps extends DefaultCellProps {
  elementType: ElementType
}

export const ElementSubtypeIconCell = (props: ElementSubtypeIconCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const subtype = props.getValue() ?? props.row.original.subType

  function renderCell (): React.JSX.Element {
    switch (subtype) {
      case 'image':
        return <IconView value={ 'image' } />
      case 'video':
        return <IconView value={ 'video' } />
      case 'audio':
        return <IconView value={ 'audio' } />
      case 'document':
        return <IconView value={ 'document' } />
      case 'archive':
      case 'folder':
        return <IconView value={ 'folder' } />
      case 'page':
        return <IconView value={ 'file' } />
      case 'snippet':
        return <IconView value={ 'snippet' } />
      case 'email':
        return <IconView value={ 'mail' } />
      case 'link':
        return <IconView value={ 'hardlink' } />
      case 'object':
      case 'dataObject':
      case 'data-object':
        return <IconView value={ 'data-object' } />
      case 'variant':
        return <IconView value={ 'data-object-variant' } />
      default:
        return <IconView value={ props.elementType } />
    }
  }

  return (
    <div className={ styles.cell }>
      <Tooltip title={ capitalize(String(subtype)) }>
        {renderCell()}
      </Tooltip>
    </div >
  )
}
