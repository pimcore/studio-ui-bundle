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
