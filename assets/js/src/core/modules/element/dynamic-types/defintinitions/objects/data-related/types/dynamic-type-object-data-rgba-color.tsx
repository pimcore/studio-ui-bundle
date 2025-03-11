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

import React from 'react'

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import type { FormItemProps } from 'antd/es/form/FormItem'
import { type Color } from 'antd/es/color-picker'
import { t } from 'i18next'
import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'

export type RgbaColorObjectDataDefinition = AbstractObjectDataDefinition & {
  minimumLength: number | null
}

const formatColor = (color: Color): string | null | false => {
  return color.cleared
    ? null
    : color.toHexString()
}

const formatColorShowText = (color: Color): React.ReactNode => {
  const formattedColor = formatColor(color)
  return formattedColor ?? (<div>({t('empty')})</div>)
}

export class DynamicTypeObjectDataRgbaColor extends DynamicTypeObjectDataAbstract {
  id: string = 'rgbaColor'

  getObjectDataComponent (props: RgbaColorObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ColorPicker
        allowClear
        className={ props.className }
        disabled={ props.noteditable === true }
        format={ 'hex' }
        inherited={ props.inherited }
        showText={ formatColorShowText }
        value={ props.value }
      />
    )
  }

  getObjectDataFormItemProps (props: RgbaColorObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      getValueFromEvent: formatColor
    }
  }
}
