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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../../dynamic-type-object-data-abstract'
import { Input } from '@Pimcore/components/input/input'
import { toCssDimension } from '@Pimcore/utils/css'

export type InputProps = AbstractObjectDataDefinition & {
  columnLength?: number
  showCharCount?: boolean
  width?: number | string | null
}

export abstract class DynamicTypeObjectDataAbstractInput extends DynamicTypeObjectDataAbstract {
  getObjectDataComponent (props: InputProps): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Input
        autoComplete="off"
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxLength={ props.columnLength ?? undefined }
        showCount={ props.showCharCount }
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.large) } }
        value={ props.value }
      />
    )
  }
}
