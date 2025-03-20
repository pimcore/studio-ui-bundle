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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { isEmpty, isNil } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from './relation-list.styles'

export interface RelationItem {
  type?: string
  id?: number
  fullPath?: string
  subtype?: string | null
  isPublished?: boolean | null
}

interface RelationListProps {
  relations: RelationItem[] | null
}

export const RelationList = ({ relations }: RelationListProps): React.JSX.Element => {
  const { styles } = useStyles()

  if (isNil(relations) || isEmpty(relations)) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper>
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
              key={ index }
              path={ relation.fullPath }
              published={ relation.isPublished ?? undefined }
            />
            )
        ))}
      </Flex>
    </GridCellPreviewWrapper>
  )
}
