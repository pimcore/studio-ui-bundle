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

import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { Slider, type SliderProps } from '@Pimcore/components/slider/slider'
import {
  type AbstractNumericObjectDataDefinition,
  DynamicTypeObjectDataAbstractNumeric
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-numeric'
import { toCssDimension } from '@Pimcore/utils/css'
import React from 'react'
import { type AbstractObjectDataDefinition } from '../dynamic-type-object-data-abstract'
import cn from 'classnames'

export type SliderObjectDataDefinition = AbstractNumericObjectDataDefinition & {
  vertical?: boolean | null
  width?: number | string | null
  height?: number | string | null
}

export class DynamicTypeObjectDataSlider extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'slider'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'

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
