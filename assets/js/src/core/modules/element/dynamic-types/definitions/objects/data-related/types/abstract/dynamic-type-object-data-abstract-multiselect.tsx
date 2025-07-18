/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

import { type GetGridCellDefinitionProps, type GridCellColumnMeta, type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import {
  DynamicTypeObjectDataAbstractSelect, type SelectProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import { toCssDimension } from '@Pimcore/utils/css'
import { META_SUPPORTS_BATCH_APPEND_MODE } from '@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode'

export abstract class DynamicTypeObjectDataAbstractMultiSelect extends DynamicTypeObjectDataAbstractSelect {
  supportsBatchAppendModes: boolean = true
  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    return super.getObjectDataComponent({
      ...props,
      multiSelect: true,
      width: toCssDimension(props.width, props.defaultFieldWidth.large)
    })
  }

  getGridCellColumnMeta (props: GetGridCellDefinitionProps): GridCellColumnMeta {
    const isEditable = props.objectProps.noteditable !== true
    const hasOptions = props.objectProps.options && Array.isArray(props.objectProps.options) && props.objectProps.options.length > 0

    return {
      type: 'multi-select',
      editable: isEditable,
      config: {
        options: isEditable && hasOptions ? this.convertOptions(props.objectProps.options as Array<{ key: string, value: string | number }> | null) : [],
        [META_SUPPORTS_BATCH_APPEND_MODE]: this.supportsBatchAppendModes
      }
    }
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 300
  }
}
