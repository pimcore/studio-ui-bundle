/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Switch } from '@Pimcore/components/switch/switch'
import { getCurrentUser } from '@sdk/modules/auth'
import { Form, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LoginTokenModalContainer } from '../login-token-modal/login-token-modal-container'

interface IAdminAccordion {
  isDisabled?: boolean
}
const AdminAccordion = ({ isDisabled, ...props }: IAdminAccordion): React.JSX.Element => {
  const { t } = useTranslation()
  const { Text } = Typography
  const user = getCurrentUser()

  const content = [
    {
      key: '1',
      title: <>{t('user-management.admin')}</>,
      children: <>
        {user.isAdmin && (
          <div className='m-b-normal'>
            <Form.Item
              name={ 'admin' }
            >
              <Switch
                disabled={ isDisabled === true }
                labelRight={ t('user-management.admin') }
                size={ 'small' }
              />
            </Form.Item>

            <Text disabled>{t('user-management.admin.info')}</Text>
          </div>
        )}

        <div>
          <LoginTokenModalContainer
            disabled={ isDisabled }
          />
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
