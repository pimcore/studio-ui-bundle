/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface IStoreImportContext {
  /** bumped once per successful configuration import of this store */
  importCount: number
  notifyImported: () => void
}

const StoreImportContext = createContext<IStoreImportContext>({
  importCount: 0,
  notifyImported: () => {}
})

/**
 * Tells the tabs of one store editor that a configuration import has landed.
 *
 * Invalidating the collection tags refreshes every grid, but a tab holding a detail form for a
 * selected entry syncs that form on the entry's ID alone — so an import that renames the selected
 * group or collection leaves the form showing the old name, and the next edit writes it back over
 * the imported one. A tab reacts to the count below by dropping its selection, which clears the
 * form and makes the next selection read the refreshed values.
 */
export const StoreImportProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [importCount, setImportCount] = useState(0)

  const notifyImported = useCallback(() => { setImportCount((count) => count + 1) }, [])

  const value = useMemo(() => ({ importCount, notifyImported }), [importCount, notifyImported])

  return (
    <StoreImportContext.Provider value={ value }>
      {children}
    </StoreImportContext.Provider>
  )
}

export const useStoreImport = (): IStoreImportContext => useContext(StoreImportContext)
