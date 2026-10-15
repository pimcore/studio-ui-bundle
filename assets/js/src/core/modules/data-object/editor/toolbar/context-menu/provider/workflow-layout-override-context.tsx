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

/**
 * Lets an applied workflow transition pin its configured object layout above the `LayoutSelectionProvider`, so the
 * layout survives the provider being re-keyed when the derived default layout changes after the element refresh.
 * `null` clears the pin. A no-op when no data-object editor provides it.
 */
export const WorkflowLayoutOverrideContext = createContext<(layoutId: string | null) => void>(() => {})
