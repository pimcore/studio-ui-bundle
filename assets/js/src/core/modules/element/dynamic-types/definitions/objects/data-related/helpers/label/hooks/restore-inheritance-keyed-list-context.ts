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
import { type KeyedListContextProps } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/keyed-list-provider'

export interface RestoreInheritanceKeyedListContextValue {
  /** Keyed list holding the field, undefined when the Ant form store holds it. */
  keyedList: KeyedListContextProps
}

/**
 * Tells useRestoreInheritance which keyed list holds a field whose label renders
 * below a list that masks it. The block header is the case: it renders inside the
 * block's own Form.NumberedList, which hides the keyed list context from its items,
 * while the block value itself still belongs to an enclosing object brick or
 * classification store.
 */
export const RestoreInheritanceKeyedListContext = createContext<RestoreInheritanceKeyedListContextValue | undefined>(undefined)
