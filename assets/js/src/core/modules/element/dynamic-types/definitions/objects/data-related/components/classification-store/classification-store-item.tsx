/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { isArray } from 'lodash'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { BaseView } from '../../../layout-related/views/base-view'
import { type ClassificationStoreGroup } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'

type ClassificationStoreGroupWithKeys = ClassificationStoreGroup & {
  keys?: any[]
}
export interface ClassificationStoreItemProps {
  groupLayout: ClassificationStoreGroupWithKeys
}

export const ClassificationStoreItem = (props: ClassificationStoreItemProps): React.JSX.Element => {
  const { groupLayout } = props

  const { currentLayoutData } = useClassificationStore()
  const { name } = useItem()
  const { operations } = useKeyedList()
  const { id } = useElementContext()

  const fieldName: string = isArray(name) ? name[name.length - 1] : name

  const handleItemDelete = (e): void => {
    e.stopPropagation()

    currentLayoutData.filter(item => item.id !== groupLayout?.id)
    operations.remove(`${groupLayout?.id}`)
  }

  return useMemo(() => {
    return (
      <BaseView
        border={ false }
        collapsed={ false }
        collapsible
        extra={ (
          <Flex className='w-full'>
            <Button
              color="default"
              icon={ <Icon value="trash" /> }
              onClick={ handleItemDelete }
              variant="filled"
            />
          </Flex>
        ) }
        extraPosition="start"
        theme='border-highlight'
        title={ groupLayout?.name }
      >
        {(groupLayout?.keys)?.map((item) => (
          <ObjectComponent
            key={ item.id }
            { ...item.definition }
            name={ item.id }
          />
        ))}
      </BaseView>
    )
  }, [groupLayout, id, fieldName])
}
