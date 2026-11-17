/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import React, { createContext, useMemo, useState } from 'react'

export const elementRootId = 1

export interface FolderNavigationData {
  folderId: number
  folderPath: string
  setFolder: (folderId: number, folderPath: string) => void
}

export type FolderNavigationContextProps = FolderNavigationData | undefined

export const FolderNavigationContext = createContext<FolderNavigationContextProps>(undefined)

export interface FolderNavigationProviderProps {
  children: React.ReactNode
}

export const FolderNavigationProvider = (props: FolderNavigationProviderProps): React.JSX.Element => {
  const [folderId, setFolderId] = useState<number>(elementRootId)
  const [folderPath, setFolderPath] = useState<string>('/')

  const setFolder: FolderNavigationData['setFolder'] = (newFolderId, newFolderPath) => {
    setFolderId(newFolderId)
    setFolderPath(newFolderPath)
  }

  return useMemo(() => (
    <FolderNavigationContext.Provider value={ { folderId, folderPath, setFolder } }>
      {props.children}
    </FolderNavigationContext.Provider>
  ), [folderId, folderPath])
}
