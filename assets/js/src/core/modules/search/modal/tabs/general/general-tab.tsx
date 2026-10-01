/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput, type ISearchInputProps } from '@Pimcore/components/search-input/search-input'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchResult } from './search-result/search-result'
import { GlobalModeSearchResult } from './search-result/global-mode-search-result'
import { SearchTermProvider } from './provider/search-term-provider'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useGlobalSearchMode } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/use-global-search-mode'
import { SearchModeDropdown } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-mode-dropdown'
import { SearchBar } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-bar'

export const GeneralTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { searchTerm: sharedSearchTerm, setSearchTerm: setSharedSearchTerm } = useSearch()
  const globalMode = useGlobalSearchMode()
  const globalAdapter = globalMode.activeMode?.getGlobalSearch?.()
  const [searchTerm, setSearchTerm] = useState(sharedSearchTerm)
  const [searchQuery, setSearchQuery] = useState(sharedSearchTerm)

  useEffect(() => {
    const timerId = setTimeout(() => { setSearchTerm(searchQuery) }, 500)
    return () => { clearTimeout(timerId) }
  }, [searchQuery])

  useEffect(() => {
    setSearchQuery(sharedSearchTerm)
  }, [sharedSearchTerm])

  const onSearch: ISearchInputProps['onSearch'] = (value) => {
    setSearchQuery(value)
    setSharedSearchTerm(value)
  }

  // On blur instead of per keystroke — a context write per character re-renders the whole modal.
  const onBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setSharedSearchTerm(event.target.value)
  }

  return (
    <ContentLayout
      renderTopBar={
        <Toolbar
          padding={ { left: 'none', right: 'none' } }
          position='top'
          // The search-mode warning line needs a second row.
          size='auto'
          theme='secondary'
        >
          <SearchBar
            modeDropdown={ globalMode.modes.length > 0
              ? (
                <SearchModeDropdown
                  activeMode={ globalMode.activeMode }
                  activeModeId={ globalMode.activeModeId }
                  fulltextLabel={ t('listing.search-mode.default') }
                  modeContext={ globalMode.modeContext }
                  modes={ globalMode.modes }
                  onModeChange={ globalMode.setModeId }
                />
                )
              : undefined }
            warning={ globalMode.availability?.warning }
          >
            <SearchInput
              className='w-full'
              data-testid="search-modal-input"
              maxWidth={ '100%' }
              onBlur={ onBlur }
              onChange={ (event) => { setSearchQuery(event.target.value) } }
              onSearch={ onSearch }
              placeholder={ globalMode.activeMode !== undefined ? t('listing.search-mode.smart-placeholder') : 'Search' }
              value={ searchQuery }
            />
          </SearchBar>
        </Toolbar>
      }
    >
      <SearchTermProvider searchTerm={ searchTerm }>
        {globalMode.activeMode === undefined || globalAdapter === undefined
          ? <SearchResult />
          : (
            <GlobalModeSearchResult
              adapter={ globalAdapter }
              key={ globalMode.activeMode.id }
            />
            )}
      </SearchTermProvider>
    </ContentLayout>
  )
}
