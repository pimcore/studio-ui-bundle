/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { Block } from '@Pimcore/components/block/block'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { isNil, isString } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const CompositeIndicesBlock = (): React.JSX.Element => {
  const { t } = useTranslation()
  const layout = useLayout()

  const fieldOptions = useMemo(() => {
    if (isNil(layout?.fieldDefinitions)) {
      return []
    }

    const dataFields = Object.values(layout.fieldDefinitions)
      .filter((field) => field.datatype === 'data' && isString(field.name) && field.name.trim().length > 0)
      .map((field) => ({
        label: field.title ?? field.name,
        value: field.name
      }))

    return dataFields.sort((a, b) => a.label.localeCompare(b.label))
  }, [layout?.fieldDefinitions])

  return (
    <Form.Item name="compositeIndices">
      <Block
        getItemTitle={ (item, index) => item?.index_key ?? `${t('class-definition.composite-indices.index-label')} ${index + 1}` }
        title={ t('class-definition.composite-indices.title') }
      >
        <Form.Item
          label={ t('class-definition.composite-indices.index-name') }
          name="index_key"
        >
          <Input placeholder={ t('class-definition.composite-indices.enter-index-name') } />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.composite-indices.type') }
          name="index_type"
        >
          <Select
            options={ [
              { label: t('class-definition.composite-indices.type-query'), value: 'query' },
              { label: t('class-definition.composite-indices.type-localized-query'), value: 'localized_query' },
              { label: t('class-definition.composite-indices.type-store'), value: 'store' },
              { label: t('class-definition.composite-indices.type-localized-store'), value: 'localized_store' }
            ] }
            placeholder={ t('class-definition.composite-indices.select-index-type') }
          />
        </Form.Item>

        <Form.Item
          label={ t('class-definition.composite-indices.columns') }
          name="index_columns"
        >
          <Select
            mode="tags"
            options={ fieldOptions }
            placeholder={ t('class-definition.composite-indices.select-column-names') }
          />
        </Form.Item>
      </Block>
    </Form.Item>
  )
}
