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

import React, { useEffect } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { KeyValueList, type KeyValueListProps } from '@Pimcore/components/key-value-list/key-value-list'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type SimpleSearchResult, useSimpleSearchPreviewGetQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { Image } from '@Pimcore/components/image/image'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { PimcoreVideo } from '@Pimcore/components/pimcore-video/pimcore-video'
import { PimcoreDocument } from '@Pimcore/components/pimcore-document/pimcore-document'
import { useStyles } from '../../../../../search.styles'

export interface SearchResultDetailProps {
  item: SimpleSearchResult
}

const KEYS_TO_REMOVE = ['elementType', 'type']
const MEDIA_TYPE = ['image', 'video', 'document']

export const SearchResultDetailFound = (props: SearchResultDetailProps): React.JSX.Element => {
  const { item } = props
  const { id, elementType } = item

  const { isError, error, isLoading, data } = useSimpleSearchPreviewGetQuery({ id, elementType: mapToElementType(elementType) as unknown as ElementType })

  const { styles } = useStyles()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  if (isLoading) {
    return <Content loading />
  }

  if (isError || error !== undefined) {
    return (
      <Content
        none
        noneOptions={ { text: 'data not available' } }
      />
    )
  }

  const { additionalAttributes, ...detail } = data!

  const preparedItemList: KeyValueListProps['items'] = Object.entries(detail)
    .filter(([key]) => !KEYS_TO_REMOVE.includes(key))
    .map(([key, value]) => {
      return {
        key,
        value
      }
    })

  const renderMediaElement = (): React.JSX.Element | null => {
    const type = item?.type
    const path = item?.path

    const isShowMediaElement = MEDIA_TYPE.includes(type)

    if (isShowMediaElement && !isEmptyValue(path)) {
      return (
        <Flex justify="center">
          {type === 'image' && (
            <Image
              className={ styles.searchResultImage }
              preview={ false }
              src={ path }
            />
          )}
          {type === 'video' && (
            <PimcoreVideo
              sources={ [{ src: path }] }
              width={ 250 }
            />
          )}
          {type === 'document' && path?.includes('.pdf') && (
            <PimcoreDocument
              className={ styles.searchResultDocument }
              src={ path }
            />
          )}
        </Flex>
      )
    }

    return null
  }

  return (
    <Content>
      {renderMediaElement()}
      <KeyValueList items={ preparedItemList } />
    </Content>
  )
}
