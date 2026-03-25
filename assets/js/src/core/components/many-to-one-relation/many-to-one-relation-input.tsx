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
import { isEmpty } from 'lodash'
import type { DragAndDropInfo } from '@sdk/components'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import {
  dndIsValidData,
  createElementSelectorAreas,
  createElementSelectorConfig,
  type IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { convertDragAndDropInfoToElementReference } from '@Pimcore/modules/element/element-helper'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { PathTarget, type PathTargetProps } from './path-target'
import type { ManyToOneRelationValue } from './many-to-one-relation'
import { useStyles } from './many-to-one-relation.styles'
import { useElementHelper } from '@sdk/modules/element'

export interface ManyToOneRelationInputProps extends PathTargetProps, IRelationAllowedTypesDataComponent {
  enableSearch?: boolean
}

export const ManyToOneRelationInput = (props: ManyToOneRelationInputProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { mapToLegacyElementType } = useElementHelper()

  const elementSelectorConfig = {
    selectionType: SelectionType.Single,
    areas: createElementSelectorAreas(props),
    config: createElementSelectorConfig(props),
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        props.onChange?.({
          type: mapToLegacyElementType(String(event.items[0].elementType)),
          subtype: event.items[0].data.type,
          id: event.items[0].data.id,
          fullPath: event.items[0].data.fullpath
        })
      }
    }
  }

  const { open: openElementSelector } = useElementSelector(elementSelectorConfig)

  const handleDrop = (info: DragAndDropInfo): void => {
    const newValue: ManyToOneRelationValue | undefined = convertDragAndDropInfoToElementReference(info)
    props.onChange?.(newValue ?? null)
  }

  const handleOpenElementSelector = (): void => {
    if (props.disabled !== true) {
      openElementSelector()
    }
  }

  return (
    <div className={ styles.droppableWrapper }>
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && isValidElementType(info.type) }
        isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, props) }
        onDrop={ handleDrop }
      >
        <PathTarget
          { ...props }
          onSearch={ props.enableSearch === true ? handleOpenElementSelector : undefined }
        />
      </Droppable>
    </div>
  )
}
