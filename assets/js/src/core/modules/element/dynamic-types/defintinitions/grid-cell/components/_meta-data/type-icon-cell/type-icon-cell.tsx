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
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'

export const TypeIconCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'metadata.input':
        return <IconView value={ 'text-field' } />
      case 'metadata.textarea':
        return <IconView value={ 'content' } />
      case 'metadata.document':
        return <IconView value={ 'data-object-variant' } />
      case 'metadata.asset':
        return <IconView value={ 'asset' } />
      case 'metadata.object':
      case 'metadata.dataObject':
        return <IconView value={ 'data-object-variant' } />
      case 'metadata.date':
        return <IconView value={ 'calendar' } />
      case 'metadata.checkbox':
        return <IconView value={ 'checkbox' } />
      default:
        return <span></span>
    }
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
