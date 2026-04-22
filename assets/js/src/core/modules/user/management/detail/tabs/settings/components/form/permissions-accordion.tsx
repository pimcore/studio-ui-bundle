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

interface IPermissionsAccordionProps {
  permissions: {
    default: Array<{ key: string }>
    bundles: Array<{ key: string }>
  }
}
const PermissionsAccordion = ({ permissions, ...props }: IPermissionsAccordionProps): React.JSX.Element => {
  const { t } = useTranslation()

  const translatePermissionOptions = (permission: { key: string }): { value: string, label: string }  => ({
    value: permission.key,
    label: t(`user-management.permissions.${permission.key}`)
  })

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.permissions.default') }</>,
      children: (
        <>
          <Form.Item
            name="permissionsDefault"
          >
            <Select
              dataTestId="permissions-select-default"
              mode="multiple"
              options={ permissions.default.map(translatePermissionOptions) }
              placeholder={
                t('user-management.permissions.default')
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="permissionsBundles"
          >
            <Select
              dataTestId="permissions-select-bundles"
              mode="multiple"
              options={ permissions.bundles.map(translatePermissionOptions) }
              placeholder={
                t('user-management.permissions.bundles')
              }
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
export { PermissionsAccordion }
