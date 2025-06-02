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
import {
  useClassDefinitionCollectionQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'

const TypesAndClassesAccordion = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading: classesLoading } = useClassDefinitionCollectionQuery()

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.types-and-classes') }</>,
      children: (
        <>
          <Form.Item
            name="docTypes"
          >
            <Select
              disabled={ classesLoading }
              mode="multiple"
              options={ [] }
              placeholder={ t('user-management.doc-types') }
            ></Select>
          </Form.Item>
          <Form.Item
            name="classes"
          >
            <Select
              disabled={ classesLoading }
              mode="multiple"
              options={ data?.items.map((item) => ({
                label: item.name,
                value: item.id
              })) }
              placeholder={ t('user-management.classes') }
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
export { TypesAndClassesAccordion }
