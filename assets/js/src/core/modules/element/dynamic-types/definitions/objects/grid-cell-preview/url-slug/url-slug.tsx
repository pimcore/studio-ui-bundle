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
