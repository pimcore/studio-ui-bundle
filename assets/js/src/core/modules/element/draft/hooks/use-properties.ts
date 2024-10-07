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

import type { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit/src/entities/models'
import type { DataProperty as DataPropertyApi } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'

import { useAppDispatch } from '@Pimcore/app/store'
import { type TrackableChangesDraft } from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'

export interface PropertyAction {
  id: number
  key?: string
  property: DataProperty
}

export interface PropertiesAction {
  id: number
  properties: DataProperty[]
}

export type DataProperty = DataPropertyApi & {
  rowId: string
}

export interface PropertiesDraft extends TrackableChangesDraft {
  properties: DataProperty[]
}

interface UsePropertiesReturn {
  addProperty: (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>) => void
  removeProperty: (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>) => void
  updateProperty: (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>) => void
  setProperties: (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertiesAction>) => void
}

export const usePropertiesReducers = (entityAdapter: EntityAdapter<PropertiesDraft, number>): UsePropertiesReturn => {
  const addProperty = (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>): void => {
    modifyDraft(state, action.payload.id, (draft: PropertiesDraft): PropertiesDraft => {
      draft.properties = [...(draft.properties ?? []), action.payload.property]

      markedAsModified(draft)
      return draft
    })
  }

  const updateProperty = (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>): void => {
    modifyDraft(state, action.payload.id, (draft: PropertiesDraft): PropertiesDraft => {
      draft.properties = (draft.properties ?? []).map((property, index) => {
        if (property.key === action.payload.key && property.inherited === action.payload.property.inherited) {
          markedAsModified(draft)

          return action.payload.property
        }

        return property
      })

      return draft
    })
  }
  const removeProperty = (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertyAction>): void => {
    modifyDraft(state, action.payload.id, (draft: PropertiesDraft): PropertiesDraft => {
      draft.properties = (draft.properties ?? []).filter(property => property.key !== action
        .payload.property.key)

      markedAsModified(draft)
      return draft
    })
  }

  const setProperties = (state: EntityState<PropertiesDraft, number>, action: PayloadAction<PropertiesAction>): void => {
    modifyDraft(state, action.payload.id, (draft: PropertiesDraft): PropertiesDraft => {
      draft.properties = action.payload.properties
      return draft
    })
  }

  const modifyDraft = (state: EntityState<PropertiesDraft, number>, id: number, modification: (draft: PropertiesDraft) => PropertiesDraft): void => {
    const draft = entityAdapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  const markedAsModified = (draft: PropertiesDraft): void => {
    draft.modified = true

    draft.changes = {
      ...draft.changes,
      properties: true
    }
  }

  return {
    addProperty,
    removeProperty,
    updateProperty,
    setProperties
  }
}

export interface UsePropertiesDraftReturn {
  properties: undefined | DataProperty[]
  updateProperty: (key: string, updatedProperty: DataProperty) => void
  addProperty: (property: DataProperty) => void
  removeProperty: (property: DataProperty) => void
  setProperties: (properties: DataProperty[]) => void
}

export const usePropertiesDraft = (
  id: number,
  draft: PropertiesDraft,
  updatePropertyAction: ActionCreatorWithPayload<PropertyAction>,
  addPropertyAction: ActionCreatorWithPayload<PropertyAction>,
  removePropertyAction: ActionCreatorWithPayload<PropertyAction>,
  setPropertiesAction: ActionCreatorWithPayload<PropertiesAction>
): UsePropertiesDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    properties: draft?.properties,

    updateProperty: (key: string, property: DataProperty): void => {
      dispatch(updatePropertyAction({ id, key, property }))
    },

    addProperty: (property: DataProperty): void => {
      dispatch(addPropertyAction({ id, property }))
    },

    removeProperty: (property: DataProperty): void => {
      dispatch(removePropertyAction({ id, property }))
    },

    setProperties: (properties: DataProperty[]): void => {
      dispatch(setPropertiesAction({ id, properties }))
    }
  }
}
