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
import { useStyles } from '../../../../../search.styles'

export interface SearchResultDetailProps {
  item: SimpleSearchResult
}

const KEYS_TO_REMOVE = ['elementType', 'type']

export const SearchResultDetailFound = (props: SearchResultDetailProps): React.JSX.Element => {
  const { item } = props
  const { id, elementType } = item

  const { isError, error, isLoading, data } = useSimpleSearchPreviewGetQuery({ id, elementType: mapToElementType(elementType) as unknown as ElementType })

  const { styles } = useStyles()

  const isImageType = item?.type === 'image'

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

  return (
    <Content>
      {isImageType && !isEmptyValue(item?.path) && (
        <Flex justify="center">
          <Image
            className={ styles.searchResultImage }
            preview={ false }
            src={ item.path }
          />
        </Flex>
      )}
      <KeyValueList
        items={ preparedItemList }
        skipEmpty={ false }
      />
    </Content>
  )
}
