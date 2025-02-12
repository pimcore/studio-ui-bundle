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

import React from 'react'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  api
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

const NotesAndEventsContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ () => {
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.AVAILABLE_TAGS()
                )
              )
            }
          }
          />
        </Toolbar> }
    >
      <Box
        margin={ 'small' }
      >
        <Flex
          gap={ 'small' }
          vertical
        >
          <Flex
            justify={ 'space-between' }
          >
            <Flex
              gap={ 'small' }
            >
              <Title>Notes & Events</Title>
            </Flex>
            <SearchInput
              loading={ false }
              onChange={ (e) => {
                const { value } = e.target
                alert(`search is changing ${value}`)
              } }
              placeholder="Search"
            />
          </Flex>
        </Flex>
      </Box>
    </ContentLayout>
  )
}

export { NotesAndEventsContainer }
