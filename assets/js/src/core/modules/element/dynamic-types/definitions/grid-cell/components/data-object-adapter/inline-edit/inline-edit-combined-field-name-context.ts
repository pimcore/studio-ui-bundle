/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, useContext } from 'react'

/**
 * Carries the dot-notation field name from EditModalCell to the inline-edited
 * field components. The editor's DataComponent normally assembles this and
 * passes it as a prop, but inline edit bypasses DataComponent — providing it
 * via context avoids any cloneElement interference with antd Form.Item.
 */
export const InlineEditCombinedFieldNameContext = createContext<string | undefined>(undefined)

export const useInlineEditCombinedFieldName = (): string | undefined => useContext(InlineEditCombinedFieldNameContext)
