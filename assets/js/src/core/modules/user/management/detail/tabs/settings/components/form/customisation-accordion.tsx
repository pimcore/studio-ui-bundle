/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Switch } from '@Pimcore/components/switch/switch'
import { Select } from '@Pimcore/components/select/select'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'

interface ICustomisationAccordion {
  isAdmin?: boolean
}
const CustomisationAccordion = ({ isAdmin, ...props }: ICustomisationAccordion): React.JSX.Element => {
  const { t } = useTranslation()
  const { availableAdminLanguages } = useSettings()
  const [roleOptions, setRoleOptions] = useState<any[]>([])
  const [perspectiveOptions, setPerspectiveOptions] = useState<any[]>([])

  const { getRoleCollection } = useRoleHelper()
  const { getPerspectiveConfigCollection } = usePerspectives()

  useEffect(() => {
    if (perspectiveOptions.length === 0) {
      getPerspectiveConfigCollection().then((data) => {
        if (data === undefined) {
          return
        }

        setPerspectiveOptions(
          data.items.map((item) => ({
            value: item.id,
            label: item.name
          }))
        )
      }).catch((error) => {
        console.error('Error fetching perspective config collection:', error)
      })
    }

    if (roleOptions.length === 0) {
      getRoleCollection().then((data) => {
        if (data === undefined) {
          return
        }
        setRoleOptions(data.items.map((item) => ({
          value: item.id,
          label: item.name
        })))
      }).catch((error) => {
        console.error('Error fetching role collection:', error)
      })
    }
  }, [])

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.customisation') }</>,
      children: <>
        <Form.Item
          label={ t('user-management.firstname') }
          name="firstname"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('user-management.lastname') }
          name="lastname"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('user-management.email') }
          name="email"
        >
          <Input type={ 'email' } />
        </Form.Item>

        <Form.Item
          label={ t('user-management.language') }
          name="language"
        >
          <Select
            options={ availableAdminLanguages.map((language) => ({
              value: language.language,
              label: language.display
            })) }
            placeholder={ t('user-management.language') }
          />
        </Form.Item>

        {isAdmin === false
          ? (
            <>
              <Form.Item
                label={ t('user-management.roles') }
                name="roles"
              >
                <Select
                  mode="multiple"
                  options={ roleOptions }
                  placeholder={ t('user-management.roles') }
                ></Select>
              </Form.Item>

              <Form.Item
                label={ t('user-management.perspectives') }
                name="perspectives"
              >
                <Select
                  mode="multiple"
                  options={ perspectiveOptions }
                  placeholder={ t('user-management.perspectives') }
                ></Select>
              </Form.Item>
            </>
            )
          : null }

        <Form.Item
          label={ 'TODO ' + t('user-management.dateTime') }
          name="dateTime"
        >
          <Select
            options={ availableAdminLanguages.map((language) => ({
              value: language.language,
              label: language.display
            })) }
            placeholder={ t('user-management.dateTime') }
          />
        </Form.Item>

        <Form.Item
          name="welcomeScreen"
        >
          <Switch labelRight={ t('user-management.welcomeScreen') } />
        </Form.Item>

        <Form.Item
          name="memorizeTabs"
        >
          <Switch labelRight={ t('user-management.memorizeTabs') } />
        </Form.Item>

        <Form.Item
          name="allowDirtyClose"
        >
          <Switch labelRight={ t('user-management.allowDirtyClose') } />
        </Form.Item>

        <Form.Item
          name="closeWarning"
        >
          <Switch labelRight={ t('user-management.closeWarning') } />
        </Form.Item>
      </>
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
export { CustomisationAccordion }
