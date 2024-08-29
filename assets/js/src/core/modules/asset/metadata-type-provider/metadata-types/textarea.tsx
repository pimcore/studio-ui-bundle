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
import { TextareaCell } from '@Pimcore/components/grid/columns/types/textarea/textarea-cell'
import { respectLineBreak } from '@Pimcore/utils/helpers'

export class Textarea implements AssetMetadataTypeInterface {
  visibleInTypeSelection = true
  formatVersionPreview (data: string): JSX.Element {
    return respectLineBreak(data, false)
  }

  getGridCell (props: DefaultCellProps): JSX.Element {
    return <TextareaCell { ...props } />
  }
}
