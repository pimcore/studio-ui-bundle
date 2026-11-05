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
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

let seen: SavedSearchPanelDraft | undefined
const Reader = (): null => {
  seen = useSearch().panelDraft
  return null
}

const Panel = ({ name, elementType }: { name: string, elementType?: ElementType }): null => {
  const publish = usePanelDraftPublisher(elementType)
  useEffect(() => { publish({ name, sharedUsers: [], sharedRoles: [] }) }, [name])
  return null
}

// the search modal: open on a tab, and its tabs mounted only while it is open
const SearchModal = ({ tab, children }: { tab: string, children: React.ReactNode }): React.JSX.Element | null => {
  const { isOpen, open } = useSearch()
  useEffect(() => { open(tab) }, [tab])
  return isOpen ? <>{ children }</> : null
}

const modal = (tab: string, objectName = 'object'): React.JSX.Element => (
  <SearchProvider>
    <Reader />
    <SearchModal tab={ tab }>
      <Panel
        elementType="asset"
        key="asset"
        name="asset"
      />
      <Panel
        elementType="data-object"
        key="data-object"
        name={ objectName }
      />
    </SearchModal>
  </SearchProvider>
)

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

  it('makes the selected tab\'s panel the draft as the modal switches tabs', () => {
    const { rerender } = render(modal('asset'))
    expect(seen?.name).toBe('asset')

    act(() => { rerender(modal('data-object')) })
    expect(seen?.name).toBe('object')

    act(() => { rerender(modal('asset')) })
    expect(seen?.name).toBe('asset')
  })

  it('keeps a panel on an unselected tab from overwriting the draft', () => {
    const { rerender } = render(modal('asset'))

    act(() => { rerender(modal('asset', 'object edited')) })
    expect(seen?.name).toBe('asset')

    act(() => { rerender(modal('data-object', 'object edited')) })
    expect(seen?.name).toBe('object edited')
  })

  it('publishes from a hosted listing, where no modal ever opens', () => {
    render(
      <SearchProvider>
        <Reader />
        <Panel
          elementType="data-object"
          name="hosted"
        />
      </SearchProvider>
    )

    expect(seen?.name).toBe('hosted')
  })
})
