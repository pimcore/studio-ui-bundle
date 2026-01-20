/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, FormKit, Input, Select } from '@sdk/components'
import React, { useMemo } from 'react'
import { useStyles } from './field-definition-regex-validation.styles'

export const FieldDefinitionRegexValidation = (): React.JSX.Element => {
  const { styles } = useStyles()
  const regex = Form.useWatch('regex')
  const regexFlags = Form.useWatch('regexFlags')
  const regexTestString = Form.useWatch('regexTestString')

  const validationClass = useMemo(() => {
    try {
      const flags = typeof regexFlags === 'string' ? regexFlags : ''

      const re = new RegExp(regex as string, flags)
      return re.test(regexTestString as string) ? styles.testStringSuccess : styles.testStringError
    } catch (e) {
      return styles.testStringError
    }
  }, [regex, regexFlags, regexTestString, styles])

  const flagOptions = [
    { label: 'global', value: 'g' },
    { label: 'ignoreCase', value: 'i' },
    { label: 'multiline', value: 'm' },
    { label: 'unicode', value: 'u' },
    { label: 'sticky', value: 'y' }
  ]

  return (
    <>
      <FormKit.Panel title="Regular Expression Validation">
        <Form.Item
          label="regex"
          name="regex"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="regex_flags"
          name="regexFlags"
          tooltip="regex_flags_tooltip"
        >
          <Select
            defaultValue=""
            mode="multiple"
            options={ flagOptions }
          />
        </Form.Item>

        <Form.Item
          label="test_string"
          name="regexTestString"
        >
          <Input className={ validationClass } />
        </Form.Item>
      </FormKit.Panel>
    </>
  )
}
