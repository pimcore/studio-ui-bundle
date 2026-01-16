/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import { isUndefined } from 'lodash'

export interface IVideoContext {
  thumbnail: string
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
  playerPosition: number
  setPlayerPosition: React.Dispatch<React.SetStateAction<number>>
}

interface IVideoProviderProps {
  children: React.ReactNode
}

const VideoContext = createContext<IVideoContext | undefined>(undefined)

export const VideoProvider = ({ children }: IVideoProviderProps): React.JSX.Element => {
  const [thumbnail, setThumbnail] = useState<string>('pimcore-system-treepreview')
  const [playerPosition, setPlayerPosition] = useState<number>(0)

  const contextValue = useMemo<IVideoContext>(() => ({
    thumbnail,
    setThumbnail,
    playerPosition,
    setPlayerPosition
  }), [thumbnail, playerPosition])

  return (
    <VideoContext.Provider value={ contextValue }>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideoContext = (): IVideoContext => {
  const context = useContext(VideoContext)

  if (isUndefined(context)) {
    throw new Error('useVideoContext must be used within VideoProvider')
  }

  return context
}
