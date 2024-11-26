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

import React from 'react'
import { Form, Input } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Switch } from '@Pimcore/components/switch/switch'
const CustomisationAccordion = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()

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
