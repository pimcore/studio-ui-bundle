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
import { Form, Typography } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Switch } from '@Pimcore/components/switch/switch'
const AdminAccordion = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { Text } = Typography

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.admin') }</>,
      children: <>
        <Form.Item
          name={ 'admin' }
        >
          <Switch labelRight={ t('user-management.admin') } />
        </Form.Item>

        <Text disabled>{ t('user-management.admin.info') }</Text>
        <div>
          <Button
            onClick={ () => { console.log('login') } }
            type="default"
          >{t('user-management.admin.login')}</Button>
        </div>
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
export { AdminAccordion }
