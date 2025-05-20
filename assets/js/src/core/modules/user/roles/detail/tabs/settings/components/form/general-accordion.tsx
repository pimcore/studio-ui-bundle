/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Form } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Select } from '@Pimcore/components/select/select'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'

const GeneralAccordion = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useRoleContext()
  const [perspectiveOptions, setPerspectiveOptions] = useState<any[]>([])
  const { getPerspectiveConfigCollection } = usePerspectives()

  const fetchPerspectiveConfig = useCallback(() => {
    getPerspectiveConfigCollection()
      .then((data) => {
        if (data?.items !== undefined) {
          setPerspectiveOptions(
            data.items.map((item) => ({
              value: item.id,
              label: item.name
            }))
          )
        }
      })
      .catch((error) => {
        console.error('Error fetching perspective config collection:', error)
      })
  }, [getPerspectiveConfigCollection])

  useEffect(() => {
    if (perspectiveOptions.length === 0) {
      fetchPerspectiveConfig()
    }
  }, [id])

  const content = [
    {
      key: '1',
      title: <>{ t('roles.general') }</>,
      info: 'ID: ' + id,
      children: (
        <>
          <Form.Item
            name="perspectives"
          >
            <Select
              mode="multiple"
              options={ [] }
              placeholder={ t('roles.perspectives') }
            ></Select>
          </Form.Item>

          <Form.Item
            label={ t('user-management.perspectives') }
            name="perspectives"
          >
            <Select
              mode="multiple"
              options={ perspectiveOptions }
              placeholder={ t('user-management.perspectives.default') }
            ></Select>
          </Form.Item>
        </>
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
