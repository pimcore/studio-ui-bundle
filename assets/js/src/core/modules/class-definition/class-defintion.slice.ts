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

import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type ClassDefinitionCollectionApiResponse, type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: ClassDefinitionCollectionApiResponse = {
  totalItems: 0,
  items: []
}

const slice = createSlice({
  name: 'classDefinition',
  initialState,
  reducers: {
    setClassDefinitions: (
      state,
      {
        payload
      }: PayloadAction<ClassDefinitionCollectionApiResponse>
    ) => {
      state.totalItems = payload.totalItems
      state.items = payload.items
    }
  }
})

injectSliceWithState(slice)

export const { setClassDefinitions } = slice.actions

export const getClassDefinitions = (state: RootState): ClassDefinitionListItem[] => state.classDefinition.items
