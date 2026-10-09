/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, useContext, useEffect, useRef } from 'react'

/**
 * Saves the element through the editor's own save flow before a workflow transition with
 * `unsavedChangesBehaviour: save` is applied. Resolves once the save has completed: true when it
 * succeeded, false when it failed or could not run.
 */
export type UnsavedChangesSaver = () => Promise<boolean>

export interface IUnsavedChangesSaverContext {
  setSaver: (saver: UnsavedChangesSaver | undefined) => void
}

/**
 * Provided by the editor's workflow subject bridge. The component that owns an element type's save
 * flow (e.g. the data-object save buttons) registers its saver here, so the workflow guard saves
 * exactly the way the user's own save does.
 */
export const UnsavedChangesSaverContext = createContext<IUnsavedChangesSaverContext | null>(null)

/**
 * Registers `saver` for the workflow of the surrounding editor while the calling component is
 * mounted. The latest `saver` is always used, so it may close over render state.
 */
export const useRegisterUnsavedChangesSaver = (saver: UnsavedChangesSaver): void => {
  const context = useContext(UnsavedChangesSaverContext)
  const saverRef = useRef(saver)
  saverRef.current = saver

  useEffect(() => {
    if (context === null) {
      return
    }

    context.setSaver(async () => await saverRef.current())

    return () => { context.setSaver(undefined) }
  }, [context])
}
