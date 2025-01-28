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
import { Form } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Select } from '@Pimcore/components/select/select'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'

const GeneralAccordion = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useRoleContext()

  const content = [
    {
      key: '1',
      title: <>{ t('roles.general') }</>,
      info: 'ID: ' + id,
      children: (
        <Form.Item
          name="perspectives"
        >
          <Select
            mode="multiple"
            options={ [] }
            placeholder={ t('roles.perspectives') }
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
