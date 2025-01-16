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

import React, { useEffect, useState } from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'

import {
  ManyToManyRelationGrid
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/grid'
import {
  type ManyToManyRelationValue,
  useValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import {
  ManyToManyRelationToolbar
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar'

import {
  dndIsValidData,
  type IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'

export interface ManyToManyRelationClassDefinitionProps {
  assetUploadPath?: string | null
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  assetInlineDownloadAllowed?: boolean | null
  disabled?: boolean
}

export interface ManyToManyRelationProps extends IRelationAllowedTypesDataComponent, ManyToManyRelationClassDefinitionProps {
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
}

export const ManyToManyRelation = (props: ManyToManyRelationProps): React.JSX.Element => {
  const [value, setValue] = useState<ManyToManyRelationValue | null>(props.value ?? null)
  const [displayedValue, setDisplayedValue] = useState<ManyToManyRelationValue | null>(props.value ?? null)
  const { onDrop, deleteItem, onSearch, addAssets, maxRemainingItems } = useValue(value, setValue, displayedValue, setDisplayedValue, props.maxItems)

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <>
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && isValidElementType(info.type) }
        isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, props) }
        onDrop={ onDrop }
        variant="outline"
      >
        <ManyToManyRelationGrid
          assetInlineDownloadAllowed={ props.assetInlineDownloadAllowed ?? false }
          deleteItem={ deleteItem }
          disabled={ props.disabled }
          value={ displayedValue }
        />
      </Droppable>
      <ManyToManyRelationToolbar
        addAssets={ addAssets }
        allowClear={ props.allowToClearRelation && props.disabled !== true }
        assetUploadPath={ props.assetUploadPath }
        empty={ () => { setValue(null) } }
        enableUpload={ props.assetsAllowed === true && props.disabled !== true }
        onSearch={ onSearch }
        uploadMaxItems={ maxRemainingItems !== undefined && maxRemainingItems > 0 ? maxRemainingItems : (props.maxItems ?? undefined) }
        uploadShowMaxItemsError={ maxRemainingItems !== undefined && maxRemainingItems <= 0 }
      />
    </>
  )
}
