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
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Select } from '@Pimcore/components/select/select'

const ORDER_BY_DIRECTIONS = [
  { value: 'ASC', label: 'ASC' },
  { value: 'DESC', label: 'DESC' }
]

export const SqlAdapter = (): React.JSX.Element => {
  const renderTextAreaItem = ({ label, name }: { label: string, name: string[] }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
    >
      <TextArea />
    </Form.Item>
  )

  return (
    <FormKit.Panel
      border
      theme="fieldset"
      title="Sql"
    >
      {renderTextAreaItem({ label: 'SELECT (eg. a,b,c)*', name: ['dataSourceConfig', 'sql'] })}
      {renderTextAreaItem({ label: 'FROM (eg. d INNER JOIN e ON c.a = e.b)*', name: ['dataSourceConfig', 'from'] })}
      {renderTextAreaItem({ label: "WHERE (eg. c = 'some_value')", name: ['dataSourceConfig', 'where'] })}
      {renderTextAreaItem({ label: 'GROUP BY (eg. b, c )', name: ['dataSourceConfig', 'groupby'] })}
      {renderTextAreaItem({ label: 'Initial Order by Field (eg. b, c )', name: ['dataSourceConfig', 'orderby'] })}
      <Form.Item
        label={ 'Initial Order by Direction ' }
        name={ ['dataSourceConfig', 'orderbydir'] }
      >
        <Select options={ ORDER_BY_DIRECTIONS } />
      </Form.Item>
    </FormKit.Panel>
  )
}
