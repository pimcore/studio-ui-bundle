/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormListFieldData, type FormListOperation } from 'antd'
import { type CollectionProps } from '../collection'
import { CollectionContentEmpty } from './collection-content-empty'
import React from 'react'
import { CollectionContentTabs, type CollectionContentTabsProps } from './types/collection-content-tabs'
import { CollectionContentList, type CollectionContentListProps } from './types/collection-content-list'

export interface CollectionContentBaseProps extends CollectionProps {
  fields: FormListFieldData[]
  operation: FormListOperation
}

export type CollectionContentProps = CollectionContentBaseProps & (CollectionContentListProps | CollectionContentTabsProps)

export const CollectionContent = (props: CollectionContentProps): React.JSX.Element => {
  const { fields } = props
  const hasFields = fields.length > 0

  if (!hasFields) {
    return <CollectionContentEmpty { ...props } />
  }

  const ContentComponent = props.type === 'tabs' ? CollectionContentTabs : CollectionContentList

  return (
    <ContentComponent { ...props } />
  )
}
