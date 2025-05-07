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

export interface IDroppableContext {
  isOver: boolean
  isValid: boolean
  isDragActive: boolean
}

export const droppableContext = createContext<IDroppableContext>({
  isOver: false,
  isValid: false,
  isDragActive: false
})

export const DroppableContextProvider = droppableContext.Provider
