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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { isEmpty, isNil, isString } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './relation-list.styles'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export interface RelationItem {
  type?: string
  id?: number
  fullPath?: string
  subtype?: string | null
  isPublished?: boolean | null
}

interface RelationListProps {
  relations: RelationItem[] | null
  isClickable?: boolean
  noWrapper?: boolean
}

export const RelationList = ({ relations, isClickable = false, noWrapper = false }: RelationListProps): React.JSX.Element => {
  const { styles } = useStyles()

  if (isNil(relations) || isEmpty(relations)) {
    return <></>
  }

  const content = (
    <Flex
      align="flex-start"
      className={ styles.container }
      gap="mini"
      vertical
    >
      {relations?.map((relation, index) => (isNil(relation.fullPath)
        ? null
        : (
          <ElementTag
            elementType={ isString(relation.type) && isClickable ? mapToElementType(relation.type)! : undefined }
            id={ relation.id }
            key={ index }
            path={ relation.fullPath }
            published={ relation.isPublished ?? undefined }
          />
          )
      ))}
    </Flex>
  )

  return noWrapper ? content : <GridCellPreviewWrapper>{content}</GridCellPreviewWrapper>
}
