/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isNil } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { SearchProvider } from '@Pimcore/modules/search/provider/search-provider'
import { AssetSearchListing } from '@Pimcore/modules/search/modal/tabs/asset/listing/asset-search-listing'
import { ObjectSearchListing } from '@Pimcore/modules/search/modal/tabs/object/listing/object-search-listing'
import { DocumentSearchListing } from '@Pimcore/modules/search/modal/tabs/document/listing/document-search-listing'
import { useSavedSearchGetConfigurationQuery } from '@Pimcore/modules/search/search-api-slice-enhanced'
import { Header } from '@Pimcore/components/header/header'
import { Title } from '@Pimcore/components/title/title'

export interface SavedSearchResultWidgetProps {
  savedSearchId: number
  elementType: ElementType
}

/**
 * Hosts a saved search as a tab in the main widget area. It loads the saved search and renders the
 * matching search listing inside its own SearchProvider, seeded so the listing restores the search
 * and the Save panel shows the update/clone state.
 */
export const SavedSearchResultWidget = ({ savedSearchId, elementType }: SavedSearchResultWidgetProps): React.JSX.Element => {
  const { data: configuration, isLoading } = useSavedSearchGetConfigurationQuery({ id: savedSearchId })

  if (isLoading || isNil(configuration)) {
    return <Content loading />
  }

  const renderListing = (): React.JSX.Element => {
    if (elementType === elementTypes.dataObject) {
      return <ObjectSearchListing />
    }
    if (elementType === elementTypes.document) {
      return <DocumentSearchListing />
    }
    return <AssetSearchListing />
  }

  return (
    <SearchProvider
      initialLoadedSavedSearch={ configuration }
      initialPendingRestore={ configuration }
    >
      <div style={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
        <Header position="top">
          <Title>{configuration.name}</Title>
        </Header>

        <div style={ { flex: 1, minHeight: 0 } }>
          { renderListing() }
        </div>
      </div>
    </SearchProvider>
  )
}
