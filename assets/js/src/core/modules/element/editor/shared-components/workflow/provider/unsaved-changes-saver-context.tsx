/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { type UnsavedChangesSaver, useWorkflowEditorCoordinatorOptional } from './workflow-editor-coordinator'

export { type UnsavedChangesSaver } from './workflow-editor-coordinator'

/**
 * Registers `saver` with the editor's workflow coordinator while the calling component is mounted,
 * so a transition with `unsavedChangesBehaviour: save` saves exactly the way the user's own save
 * does — from every workflow entry point of the editor. The latest `saver` is always used, so it
 * may close over render state. Without a coordinator (no editor around) nothing is registered.
 */
export const useRegisterUnsavedChangesSaver = (saver: UnsavedChangesSaver): void => {
  const coordinator = useWorkflowEditorCoordinatorOptional()
  const saverRef = useRef(saver)
  saverRef.current = saver

  useEffect(() => {
    if (coordinator === null) {
      return
    }

    coordinator.setSaver(async () => await saverRef.current())

    return () => { coordinator.setSaver(undefined) }
  }, [coordinator])
}
