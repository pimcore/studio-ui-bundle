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
import { useDocumentDocTypeListQuery } from '@Pimcore/modules/document/document-api-slice-enhanced'

const TypesAndClassesAccordion = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { data: classesData, isLoading: classesLoading } = useClassDefinitionCollectionQuery()
  const { data: documentTypesData, isLoading: documentTypesLoading } = useDocumentDocTypeListQuery({})

  const sortByLabel = (values: any[], options: Array<{ value: any, label: string }>): any[] => {
    const labelMap = new Map(options.map((o) => [o.value, o.label ?? '']))
    return [...values].sort((a, b) => (labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''))
  }

  const docTypeOptions = documentTypesData?.items.map((item) => ({
    label: item.name ?? '',
    value: item.id
  })).sort((a, b) => a.label.localeCompare(b.label)) ?? []

  const classOptions = classesData?.items.map((item) => ({
    label: item.name ?? '',
    value: item.id
  })).sort((a, b) => a.label.localeCompare(b.label)) ?? []

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.types-and-classes') }</>,
      children: (
        <>
          <Form.Item
            name="docTypes"
            normalize={ (values) => sortByLabel(values, docTypeOptions) }
          >
            <Select
              disabled={ documentTypesLoading }
              mode="multiple"
              options={ docTypeOptions }
              placeholder={ t('user-management.doc-types') }
            ></Select>
          </Form.Item>
          <Form.Item
            name="classes"
            normalize={ (values) => sortByLabel(values, classOptions) }
          >
            <Select
              disabled={ classesLoading }
              mode="multiple"
              options={ classOptions }
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
