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
import { isNil } from 'lodash'
import { type UrlSlugEntry } from '../../data-related/components/url-slug/url-slug'
import { Tag } from '@Pimcore/components/tag/tag'
import { Flex } from '@Pimcore/components/flex/flex'

interface UrlSlugProps {
  value: UrlSlugEntry[] | null
}

export const UrlSlug = ({ value }: UrlSlugProps): React.JSX.Element => {
  if (isNil(value)) {
    return <></>
  }

  const slugs: string[] = [...new Set(value.map((entry) => entry.slug))]

  return (
    <GridCellPreviewWrapper>
      <Flex gap="mini">
        {slugs.map((slug, index) => (
          <Tag key={ index }>
            {slug}
          </Tag>
        ))}
      </Flex>
    </GridCellPreviewWrapper>
  )
}
