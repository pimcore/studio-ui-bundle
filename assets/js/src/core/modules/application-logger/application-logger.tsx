/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContentLayout, Sidebar } from '@sdk/components'
import { type SortingState } from '@tanstack/react-table'
import { isNil } from 'lodash'
import React from 'react'
import { type BundleApplicationLoggerGetCollectionApiResponse } from './application-logger-api-slice.gen'
import { sidebarManager } from './components/sidebar'
import { Table } from './components/table/table'

interface ApplicationLoggerProps {
  items: BundleApplicationLoggerGetCollectionApiResponse['items']
  isLoading?: boolean
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
}

export const ApplicationLogger = ({ items, isLoading, sorting, onSortingChange }: ApplicationLoggerProps): React.JSX.Element => {
  if (isNil(items)) {
    return <></>
  }

  return (
    <ContentLayout
      renderSidebar={
        <Sidebar
          entries={ sidebarManager.getEntries() }
        />
      }
    >
      <Table
        isLoading={ isLoading }
        items={ items }
        onSortingChange={ onSortingChange }
        sorting={ sorting }
      />
    </ContentLayout>
  )
}
