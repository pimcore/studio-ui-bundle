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
  dndIsValidData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/utils/dnd-is-valid'

export interface ManyToManyRelationClassDefinitionProps {
  assetsAllowed: boolean
  assetTypes?: Array<{ assetTypes: string }>
  objectsAllowed: boolean
  classes?: Array<{ classes: string }>
  documentsAllowed: boolean
  documentTypes?: Array<{ documentTypes: string }>
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  assetInlineDownloadAllowed?: boolean | null
}

export interface ManyToManyRelationProps extends ManyToManyRelationClassDefinitionProps {
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
}

export const ManyToManyRelation = (props: ManyToManyRelationProps): React.JSX.Element => {
  const dummyValue: ManyToManyRelationValue = [
    {
      id: 35,
      type: 'asset',
      subType: 'image',
      published: true,
      fullPath: '/Car Images/buick/buick-1400243.jpg'
    },
    {
      id: 772,
      type: 'data-object',
      subType: 'News',
      published: true,
      fullPath: '/News/Lor separat existentie es un myth'
    },
    {
      id: 765,
      type: 'data-object',
      subType: 'News',
      published: true,
      fullPath: '/News/Montery Car Week Spring Edition'
    },
    {
      id: 766,
      type: 'data-object',
      subType: 'News',
      published: true,
      fullPath: '/News/Vintage Car Auction Detroit'
    },
    {
      id: 562,
      type: 'data-object',
      subType: null,
      fullPath: '/Shop',
      published: true
    }
  ]

  const [value, setValue] = useState<ManyToManyRelationValue | null>(props.value ?? dummyValue)
  const [displayedValue, setDisplayedValue] = useState<ManyToManyRelationValue | null>(props.value ?? dummyValue)
  const { onDrop, deleteItem, onSearch } = useValue(value, setValue, displayedValue, setDisplayedValue, props.maxItems)

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <>
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => { return isValidElementType(info.type) } }
        isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, props) }
        onDrop={ onDrop }
        variant="outline"
      >
        <ManyToManyRelationGrid
          assetInlineDownloadAllowed={ props.assetInlineDownloadAllowed ?? false }
          deleteItem={ deleteItem }
          value={ displayedValue }
        />
      </Droppable>
      <ManyToManyRelationToolbar
        allowClear={ props.allowToClearRelation }
        empty={ () => { setValue(null) } }
        onSearch={ onSearch }
      />
    </>
  )
}
