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
import React from 'react'
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'

export const TypeIconCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'document':
        return <IconView value={ 'document' } />
      case 'asset':
        return <IconView value={ 'asset' } />
      case 'dataObject':
        return <IconView value={ 'data-object' } />
      default:
        return <span>{ propertyType }</span>
    }
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
