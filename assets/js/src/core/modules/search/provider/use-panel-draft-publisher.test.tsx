/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { act, render } from '@testing-library/react'
import { SearchProvider, type SavedSearchPanelDraft } from './search-provider'
import { usePanelDraftPublisher } from './use-panel-draft-publisher'
import { useSearch } from './use-search'

let seen: SavedSearchPanelDraft | undefined
const Reader = (): null => {
  seen = useSearch().panelDraft
  return null
}

const Panel = ({ name }: { name: string }): null => {
  const publish = usePanelDraftPublisher()
  useEffect(() => { publish({ name, sharedUsers: [], sharedRoles: [] }) }, [])
  return null
}

describe('usePanelDraftPublisher', () => {
  beforeEach(() => { seen = undefined })

  it('takes the draft back when its panel is swapped out of the provider', () => {
    const { rerender } = render(<SearchProvider><Reader /><Panel name="asset" /></SearchProvider>)
    expect(seen?.name).toBe('asset')

    act(() => { rerender(<SearchProvider><Reader /></SearchProvider>) })

    expect(seen).toBeUndefined()
  })

  it('leaves a draft another mounted panel published since', () => {
    const { rerender } = render(<SearchProvider><Reader /><Panel
      key="asset"
      name="asset"
                                                          /><Panel
                                                            key="object"
                                                            name="object"
                                                            /></SearchProvider>)
    expect(seen?.name).toBe('object')

    act(() => {
      rerender(<SearchProvider><Reader /><Panel
        key="object"
        name="object"
                                         /></SearchProvider>) 
    })

    expect(seen?.name).toBe('object')
  })
})
