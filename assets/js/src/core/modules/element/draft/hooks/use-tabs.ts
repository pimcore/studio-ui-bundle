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

import { useAppDispatch } from '@Pimcore/app/store'
import { type PayloadAction, type ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit/src/entities/models'

export interface TabsDraft {
  activeTab: string | null
}

export interface SetActiveTabAction {
  id: number
  activeTab: TabsDraft['activeTab']
}

export interface UseTabsReturn {
  setActiveTab: (state: EntityState<TabsDraft, number>, action: PayloadAction<SetActiveTabAction>) => void
}

export const initialTabsStateValue = {
  activeTab: null
}

type TabsEntityAdapter = EntityAdapter<TabsDraft, number>
type TabsEntityState = EntityState<TabsDraft, number>

export const useTabsReducers = (adapter: TabsEntityAdapter): UseTabsReturn => {
  const setActiveTab = (state: TabsEntityState, action: PayloadAction<SetActiveTabAction>): void => {
    const { id, activeTab } = action.payload
    modifyDraft(state, id, (draft: TabsDraft): TabsDraft => {
      draft.activeTab = activeTab
      return draft
    })
  }

  const modifyDraft = (state: TabsEntityState, id: number, modification: (draft: TabsDraft) => TabsDraft): void => {
    const draft = adapter.getSelectors().selectById(state, id)
    if (draft === undefined) {
      console.error(`Item with id ${id} not found`)
      return
    }

    state.entities[id] = modification({ ...draft })
  }

  return {
    setActiveTab
  }
}

export interface UseTabsDraftReturn extends TabsDraft {
  setActiveTab: (tab: string) => void
}

export const useTabsDraft = (
  id: number,
  draft: TabsDraft,
  setActiveTabAction: ActionCreatorWithPayload<SetActiveTabAction>
): UseTabsDraftReturn => {
  const dispatch = useAppDispatch()

  return {
    ...draft,
    setActiveTab: (tab: string) => dispatch(setActiveTabAction({ id, activeTab: tab }))
  }
}
