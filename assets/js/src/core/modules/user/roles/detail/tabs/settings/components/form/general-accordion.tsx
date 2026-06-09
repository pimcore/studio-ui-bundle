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
import { Form } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Select } from '@Pimcore/components/select/select'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'
import { usePerspectiveGetConfigCollectionQuery } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'

const GeneralAccordion = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useRoleContext()
  const { data: perspectivesData } = usePerspectiveGetConfigCollectionQuery()

  const perspectiveOptions = (perspectivesData?.items ?? [])
    .map((item) => ({ value: item.id, label: item.name }))
    .sort((a, b) => (a.label ?? '').localeCompare(b.label ?? ''))

  const sortByLabel = (values: string[]): string[] => {
    const labelMap = new Map(perspectiveOptions.map((o) => [o.value, o.label ?? '']))
    return [...values].sort((a, b) => (labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''))
  }

  const content = [
    {
      key: '1',
      title: <>{ t('roles.general') }</>,
      info: 'ID: ' + id,
      children: (
        <Form.Item
          label={ t('user-management.perspectives') }
          name="perspectives"
          normalize={ sortByLabel }
        >
          <Select
            mode="multiple"
            options={ perspectiveOptions }
            placeholder={ t('user-management.perspectives') }
          ></Select>
        </Form.Item>
      )
    }
  ]
  return (
    <Accordion
      activeKey={ '1' }
      bordered
      items={ content }
      size={ 'small' }
    />
  )
}
export { GeneralAccordion }
