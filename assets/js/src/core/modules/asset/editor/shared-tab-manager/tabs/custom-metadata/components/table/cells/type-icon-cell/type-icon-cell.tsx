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
  // const { styles } = useStyles()
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'input':
        return <IconView name={ 'text-input' } />
      case 'textarea':
        return <IconView name={ 'note' } />
      case 'document':
        return <IconView name={ 'mainDocument' } />
      case 'asset':
        return <IconView name={ 'mainAsset' } />
      case 'object':
      case 'dataObject':
        return <IconView name={ 'mainObject' } />
      case 'date':
        return <IconView name={ 'calendar-date' } />
      case 'checkbox':
        return <IconView name={ 'check-done-02' } />
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
