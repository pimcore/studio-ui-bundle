/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo } from 'react'

export interface PipelineItemPosition {
  groupId: string
  index: number
}

export interface IPipelineItemExpandContext {
  // set where the pipeline is shown in a compact view: expandable items then offer an expand button
  onExpandItem?: (position: PipelineItemPosition) => void
  // set in the expanded view: the item is scrolled into view and its first field focused
  focusedItem?: PipelineItemPosition
}

export interface PipelineItemExpandProviderProps extends IPipelineItemExpandContext {
  children: React.ReactNode
}

export const PipelineItemExpandContext = createContext<IPipelineItemExpandContext>({})

export const PipelineItemExpandProvider = ({ onExpandItem, focusedItem, children }: PipelineItemExpandProviderProps): React.JSX.Element => {
  const groupId = focusedItem?.groupId
  const index = focusedItem?.index

  const value = useMemo(() => ({
    onExpandItem,
    focusedItem: groupId === undefined || index === undefined ? undefined : { groupId, index }
  }), [onExpandItem, groupId, index])

  return (
    <PipelineItemExpandContext.Provider value={ value }>
      {children}
    </PipelineItemExpandContext.Provider>
  )
}
