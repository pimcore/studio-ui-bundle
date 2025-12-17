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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Box, Divider } from '@sdk/components'
import { SearchReplaceForm } from './components/search-replace-form/search-replace-form'
import { Toolbar } from './components/toolbar/toolbar'
import { Table } from './components/table/table'
import { SearchReplaceAssignmentsProvider } from './providers/search-replace-assignments/search-replace-assignments-provider'

const SearchReplaceAssignmentsContent = (): React.JSX.Element => {
  // Context provides all necessary data and handlers through child components
  // No destructuring needed here as components use the context directly

  useEffect(() => {
    return () => {
      console.log('SearchReplaceAssignmentsContainer unmounting')
    }
  }, [])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar />
      }
      renderTopBar={
        <>
          <SearchReplaceForm />
          <Box margin={ { bottom: 'small' } }>
            <Divider
              size="none"
              theme="secondary"
            />
          </Box>
        </>
      }
    >
      <Content>
        <Table />
      </Content>
    </ContentLayout>
  )
}

export const SearchReplaceAssignmentsContainer = (): React.JSX.Element => {
  return (
    <SearchReplaceAssignmentsProvider>
      <SearchReplaceAssignmentsContent />
    </SearchReplaceAssignmentsProvider>
  )
}
