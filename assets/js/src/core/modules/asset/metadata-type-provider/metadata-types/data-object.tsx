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

import { type AssetMetadataTypeInterface } from '../services/metadata-type-registry'
import React from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { ElementCell } from '@Pimcore/components/grid/columns/types/element-cell/element-cell'

export class DataObject implements AssetMetadataTypeInterface {
  visibleInTypeSelection = true
  formatVersionPreview (data: { path: string, key: string }): JSX.Element {
    return <span>{ data.path }{ data.key }</span>
  }

  getGridCell (props: DefaultCellProps): JSX.Element {
    return <ElementCell { ...props } />
  }
}
