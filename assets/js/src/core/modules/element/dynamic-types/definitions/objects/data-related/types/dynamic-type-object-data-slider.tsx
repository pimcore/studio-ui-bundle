/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { Slider, type SliderProps } from '@Pimcore/components/slider/slider'
import {
  type AbstractNumericObjectDataDefinition,
  DynamicTypeObjectDataAbstractNumeric
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-numeric'
import { toCssDimension } from '@Pimcore/utils/css'
import React from 'react'
import { type EditMode, type AbstractObjectDataDefinition, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'
import cn from 'classnames'
import { Numeric } from '../../grid-cell-preview/numeric/numeric'

export type SliderObjectDataDefinition = AbstractNumericObjectDataDefinition & {
  vertical?: boolean | null
  width?: number | string | null
  height?: number | string | null
}

export class DynamicTypeObjectDataSlider extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'slider'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return (
      <Numeric value={ value } />
    )
  }

  getObjectDataComponent (props: SliderObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const componentProps = this.getObjectDataComponentProps(props) as SliderProps

    return (
      <Slider
        { ...componentProps }
        allowClear
        className={ cn('w-full', props.className) }
        showValue
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.large), height: toCssDimension(props.height, props.vertical === true ? 100 : undefined) } }
        vertical={ props.vertical ?? undefined }
      />
    )
  }
}
