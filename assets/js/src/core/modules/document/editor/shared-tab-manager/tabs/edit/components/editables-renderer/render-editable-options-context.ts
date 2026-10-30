/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext } from 'react'

export interface RenderEditableOptions {
  /**
   * Hold back the immediate save-and-reload that reload-on-change editables trigger and store the
   * value only. The owner (e.g. the editable dialog) decides when the deferred reload happens.
   */
  deferReloadOnChange: boolean
  /** Called every time a reload was held back. */
  onReloadDeferred?: () => void
  /**
   * Write changes into the editable store only, without marking the document as modified or
   * scheduling an autosave. The owner persists the batch itself (the editable dialog on Save).
   */
  deferPersistence?: boolean
}

export const RenderEditableOptionsContext = createContext<RenderEditableOptions>({
  deferReloadOnChange: false
})
