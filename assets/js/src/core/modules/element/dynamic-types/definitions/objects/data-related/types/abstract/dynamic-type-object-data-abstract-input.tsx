/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps, type GridCellColumnMeta } from '../../dynamic-type-object-data-abstract'
import { Input } from '@Pimcore/components/input/input'
import { toCssDimension } from '@Pimcore/utils/css'

export type InputProps = AbstractObjectDataDefinition & {
  columnLength?: number
  showCharCount?: boolean
  width?: number | string | null
}

export abstract class DynamicTypeObjectDataAbstractInput extends DynamicTypeObjectDataAbstract {
  gridCellEditMode: EditMode = 'column-meta'

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

  getGridCellColumnMeta (props: GetGridCellDefinitionProps): GridCellColumnMeta {
    return {
      type: 'input',
      editable: props.objectProps.noteditable !== true
    }
  }
}
