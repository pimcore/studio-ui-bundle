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
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { BaseView } from '../../../layout-related/views/base-view'
import { type ObjectBrickProps } from './object-brick'
import { Form } from '@Pimcore/components/form/form'
import { ObjectBrickAddButton } from './object-brick-add-button'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { useKeyedList } from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list'
import { ObjectBrickItem } from './object-brick-item'

export interface ObjectBrickContentProps extends ObjectBrickProps {}

export const ObjectBrickContent = (props: ObjectBrickContentProps): React.JSX.Element => {
  const { values, operations } = useKeyedList()

  const modal = useFormModal()
  const { t } = useTranslation()

  const maxItemsCount = props?.maxItems ?? 0
  const valuesKeys = Object.keys(values)
  const isNoteditable = props.noteditable === true

  const allowedTypes = props.allowedTypes?.filter((item) => !valuesKeys.includes(item))
  const isItemLimitReached = maxItemsCount > 0 && valuesKeys.length === maxItemsCount
  const isHideAddButton = isNoteditable || isItemLimitReached || isEmpty(allowedTypes)

  const tabItems: ITabsProps['items'] = valuesKeys?.map((key) => {
    return {
      key,
      label: key,
      closable: true,
      forceRender: true,
      children: (
        <Form.Group
          name={ key }
        >
          <ObjectBrickItem
            noteditable={ props.noteditable }
            type={ key }
          />
        </Form.Group>
      )
    }
  })

  const onClose: ITabsProps['onClose'] = (key: string) => {
    modal.confirm({
      content: (
        <span>{t('element.delete.confirmation.text')}</span>
      ),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: () => { operations.remove(key) }
    })
  }

  return useMemo(() => (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      contentPadding={ 'none' }
      extra={ !isHideAddButton && <ObjectBrickAddButton allowedTypes={ allowedTypes } /> }
      extraPosition='start'
      theme='default'
      title={ props.title }
    >
      <Tabs
        items={ tabItems }
        onClose={ !isNoteditable ? onClose : undefined }
      />
    </BaseView>
  ), [values])
}
