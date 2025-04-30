/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { useClassificationStoreGetLayoutByGroupQuery } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { isArray } from 'lodash'
import React, { useMemo } from 'react'
import { BaseView } from '../../../layout-related/views/base-view'

export interface ClassificationStoreItemProps {
  groupId: string
}

export const ClassificationStoreItem = (props: ClassificationStoreItemProps): React.JSX.Element => {
  const { name } = useItem()
  const fieldName = isArray(name) ? name[name.length - 1] : name
  const { groupId } = props
  const { id } = useElementContext()
  const { isLoading, data } = useClassificationStoreGetLayoutByGroupQuery({ fieldName, groupId: parseInt(groupId), objectId: id })

  return useMemo(() => {
    if (isLoading) {
      return <Content loading />
    }

    return (
      <BaseView
        border={ false }
        collapsed={ false }
        collapsible
        theme='border-highlight'
        title={ data?.name }
      >
        {data?.keys.map((item) => (
          <ObjectComponent
            key={ item.id }
            { ...item.definition }
            name={ item.id }
          />
        ))}
      </BaseView>
    )
  }, [data, isLoading, groupId, id, fieldName])
}
