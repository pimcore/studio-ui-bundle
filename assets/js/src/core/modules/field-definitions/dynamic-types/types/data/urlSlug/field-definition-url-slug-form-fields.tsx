/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { useSites } from '@Pimcore/modules/document/hooks/use-sites'
import { Form, Input, InputNumber, Select } from '@sdk/components'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionUrlSlugFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')
  const { getAllSites } = useSites({ excludeMainSite: true })

  const siteOptions = useMemo(() => {
    return getAllSites().map((site) => ({
      label: site.domain,
      value: site.id
    }))
  }, [getAllSites])

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      { !isCustomLayout && (
        <>
          <Form.Item
            label={ t('domain-label-width') }
            name="domainLabelWidth"
          >
            <InputNumber
              min={ 0 }
              precision={ 0 }
            />
          </Form.Item>

          <Form.Item
            label={ t('controller-action') }
            name="action"
            tooltip={ t('controller-action-tooltip') }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={ t('available-sites') }
            name="availableSites"
          >
            <Select
              mode="multiple"
              options={ siteOptions }
            />
          </Form.Item>
        </>
      ) }

    </>
  )
}
