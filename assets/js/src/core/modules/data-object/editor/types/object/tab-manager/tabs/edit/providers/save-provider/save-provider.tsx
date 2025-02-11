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

import React, { createContext, useState, useMemo } from 'react'

export interface ISaveContext {
  isAutoSaved: boolean
  setIsAutoSaved: (value: boolean) => void
  isAutoSaveLoading: boolean
  setIsAutoSaveLoading: (value: boolean) => void
}

export const SaveContext = createContext<ISaveContext | undefined>(undefined)

export const SaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAutoSaved, setIsAutoSaved] = useState<boolean>(false)
  const [isAutoSaveLoading, setIsAutoSaveLoading] = useState<boolean>(false)

  const value = useMemo(() => ({
    isAutoSaved,
    setIsAutoSaved,
    isAutoSaveLoading,
    setIsAutoSaveLoading
  }), [isAutoSaved, isAutoSaveLoading])

  return (
    <SaveContext.Provider value={ value }>
      {children}
    </SaveContext.Provider>
  )
}
