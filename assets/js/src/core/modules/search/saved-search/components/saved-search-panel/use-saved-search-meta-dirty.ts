/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isNil } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { type formInstanceType } from '@Pimcore/components/form/use-form'
import { useAppDispatch } from '@Pimcore/app/store'
import { type SavedSearchDetailedConfiguration } from '@Pimcore/modules/search/search-api-slice.gen'
import { setSavedSearchDirty } from '@Pimcore/modules/search/saved-search/dirty/saved-search-dirty-slice'
import { toNumberArray } from '@Pimcore/modules/search/saved-search/utils/to-number-array'

// Order-independent comparison of two id lists (shared users / roles).
const sameIdSet = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) {
    return false
  }
  const sortedA = [...a].sort((x, y) => x - y)
  const sortedB = [...b].sort((x, y) => x - y)
  return sortedA.every((value, index) => value === sortedB[index])
}

interface UseSavedSearchMetaDirtyParams {
  form: formInstanceType
  loaded: SavedSearchDetailedConfiguration | undefined
  isOwner: boolean
  /** The saved-search id the form has been prefilled for; gates the comparison to avoid a "*" flash. */
  prefilledId: number | undefined
  isSharedGlobally: boolean
  sharedUsers: number[]
  sharedRoles: number[]
}

/**
 * Reports whether the save panel's metadata (name/description/shortcut/sharing) differs from the
 * loaded saved search, feeding the 'meta' source of the tab "*" indicator (combined with the grid
 * tracker's flag). Only your own loaded search can be updated, so a shared search (clone) never
 * reports dirty. The flag is cleared on unmount / when the loaded search changes — unsaved panel
 * edits don't survive a panel close anyway, so the "*" should not linger from this source.
 */
export const useSavedSearchMetaDirty = (params: UseSavedSearchMetaDirtyParams): void => {
  const { form, loaded, isOwner, prefilledId, isSharedGlobally, sharedUsers, sharedRoles } = params
  const dispatch = useAppDispatch()

  // Watch the live form values so metadata edits in the panel re-evaluate dirtiness.
  const watchedName = Form.useWatch('name', form)
  const watchedDescription = Form.useWatch('description', form)
  const watchedCreateMenuShortcut = Form.useWatch('createMenuShortcut', form)
  const watchedMenuShortcutGroup = Form.useWatch('menuShortcutGroup', form)

  const liveGroup = (watchedCreateMenuShortcut ?? false) ? (watchedMenuShortcutGroup ?? '') : ''
  const loadedGroup = !isNil(loaded) && loaded.createMenuShortcut ? (loaded.menuShortcutGroup ?? '') : ''
  const metaDirty = !isNil(loaded) && isOwner && prefilledId === loaded.id && (
    (watchedName ?? '') !== loaded.name ||
    (watchedDescription ?? '') !== (loaded.description ?? '') ||
    (watchedCreateMenuShortcut ?? false) !== loaded.createMenuShortcut ||
    liveGroup !== loadedGroup ||
    isSharedGlobally !== loaded.shareGlobal ||
    !sameIdSet(sharedUsers, toNumberArray(loaded.sharedUsers)) ||
    !sameIdSet(sharedRoles, toNumberArray(loaded.sharedRoles))
  )

  useEffect(() => {
    if (isNil(loaded) || !isOwner) {
      return
    }
    dispatch(setSavedSearchDirty({ id: loaded.id, source: 'meta', dirty: metaDirty }))
  }, [loaded?.id, isOwner, metaDirty])

  useEffect(() => {
    const id = loaded?.id
    return () => {
      if (!isNil(id)) {
        dispatch(setSavedSearchDirty({ id, source: 'meta', dirty: false }))
      }
    }
  }, [loaded?.id])
}
