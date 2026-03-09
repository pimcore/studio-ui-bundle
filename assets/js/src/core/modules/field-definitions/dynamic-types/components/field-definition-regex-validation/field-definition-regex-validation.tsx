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
import { isArray, toString } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionRegexValidation = (): React.JSX.Element => {
  const { t } = useTranslation()
  const regex = Form.useWatch('regex')
  const regexFlags = Form.useWatch('regexFlags')

  const flagOptions = [
    { label: 'global', value: 'g' },
    { label: 'ignoreCase', value: 'i' },
    { label: 'multiline', value: 'm' },
    { label: 'unicode', value: 'u' },
    { label: 'sticky', value: 'y' }
  ]

  return (
    <FormKit.Panel
      border
      theme="fieldset"
      title={ t('regex-validation') }
    >
      <Form.Item
        label={ t('regex') }
        name="regex"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('regex-flags') }
        name="regexFlags"
        tooltip={ t('regex-flags-tooltip') }
      >
        <Select
          mode="multiple"
          options={ flagOptions }
        />
      </Form.Item>

      <Form.Item
        dependencies={ ['regex', 'regexFlags'] }
        label={ t('test-string') }
        name="regexTestString"
        rules={ [
          () => ({
            async validator (_, value: string) {
              try {
                const flags = isArray(regexFlags) ? regexFlags.join('') : toString(regexFlags)
                const re = new RegExp(regex as string, flags)
                if (re.test(value)) {
                  return
                }
              } catch {
                // Fallback for invalid regex
              }

              throw new Error(t('regex-validation-error-message'))
            }
          })
        ] }
        validateTrigger={ ['onChange', 'onBlur'] }
      >
        <Input />
      </Form.Item>
    </FormKit.Panel>
  )
}
