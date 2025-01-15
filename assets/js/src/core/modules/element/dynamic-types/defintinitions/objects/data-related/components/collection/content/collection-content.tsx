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
