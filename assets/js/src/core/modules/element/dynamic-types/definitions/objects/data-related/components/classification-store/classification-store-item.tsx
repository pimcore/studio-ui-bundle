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
import { useTranslation } from 'react-i18next'
import { useItem } from '@Pimcore/components/form/item/provider/item/use-item'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { BaseView } from '../../../layout-related/views/base-view'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { useKeyedListContext } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Panel } from '@Pimcore/components/panel/panel'
import { useClassificationStore } from './provider'
import { getHiddenKeyIds } from './utils/hide-empty-data'

export interface ClassificationStoreItemProps {
  groupLayout?: ClassificationStoreGroupLayout2
  currentLayoutData: ClassificationStoreGroupLayout2[]
  updateCurrentLayoutData: (value: ClassificationStoreGroupLayout2[]) => void
  /** Hide the keys of this group that carry no data. */
  hideEmptyData?: boolean
  /** Changes whenever hiding is switched back on, to re-evaluate the empty keys. */
  hideEmptyDataRevision?: number
  /** Localization the group is currently edited in ('default' or a language). */
  localizationGroup?: string
}

export const ClassificationStoreItem = (props: ClassificationStoreItemProps): React.JSX.Element => {
  const {
    groupLayout,
    currentLayoutData,
    updateCurrentLayoutData,
    hideEmptyData = false,
    hideEmptyDataRevision = 0,
    localizationGroup = 'default'
  } = props

  const { name } = useItem()
  const { operations } = useKeyedListContext()
  const { id } = useElementContext()
  const { isNewGroup } = useClassificationStore()

  const modal = useFormModal()
  const { t } = useTranslation()

  const fieldName: string = isArray(name) ? name[name.length - 1] : name

  const handleItemDelete = (): void => {
    const updatedLayout = currentLayoutData.filter(item => item.id !== groupLayout?.id)
    updateCurrentLayoutData(updatedLayout)

    operations.remove(String(groupLayout?.id))
  }

  // The group values are read through the keyed-list operations instead of a
  // subscription on purpose: subscribing would re-render the whole group on every
  // keystroke, and a field must not disappear while its value is being cleared.
  // Re-evaluated only when the group, its localization or the hide revision changes.
  const visibleKeys = useMemo(() => {
    const keys = groupLayout?.keys ?? []
    const groupId = groupLayout?.id

    if (!hideEmptyData || groupId === undefined || isNewGroup(String(groupId))) {
      return keys
    }

    const hiddenKeyIds = getHiddenKeyIds({
      keys,
      groupValue: operations.getValue([String(groupId), localizationGroup])
    })

    return keys.filter((key) => !hiddenKeyIds.has(key.id))
  }, [groupLayout, hideEmptyData, hideEmptyDataRevision, localizationGroup, operations, isNewGroup])

  const handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    e.stopPropagation()

    modal.confirm({
      content: (
        <span>{t('element.delete.confirmation.text')}</span>
      ),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: () => { handleItemDelete() }
    })
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
              onClick={ handleClose }
              variant="filled"
            />
          </Flex>
        ) }
        extraPosition="start"
        theme='border-highlight'
        title={ groupLayout?.name }
      >
        <Panel>
          {visibleKeys.map((item) => (
            <ObjectComponent
              key={ item.id }
              { ...item.definition }
              name={ item.id }
            />
          ))}
        </Panel>
      </BaseView>
    )
  }, [groupLayout, id, fieldName, currentLayoutData, visibleKeys])
}
