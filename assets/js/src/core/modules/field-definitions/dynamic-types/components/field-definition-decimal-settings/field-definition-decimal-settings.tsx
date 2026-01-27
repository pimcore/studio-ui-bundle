/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, FormKit, InputNumber } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionDecimalSettings = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      border
      theme="fieldset"
      title={ t('decimal-settings') }
      tooltip={ t('decimal-settings-tooltip') }
    >

      <Form.Item
        label={ t('decimal-size') }
        name="decimalSize"
        rules={ [{ min: 0, type: 'number' }] }
      >
        <InputNumber
          min={ 0 }
          precision={ 0 }
        />
      </Form.Item>

      <Form.Item
        label={ t('decimal-precision') }
        name="decimalPrecision"
        rules={ [{ min: 0, type: 'number' }] }
      >
        <InputNumber
          min={ 0 }
          precision={ 0 }
        />
      </Form.Item>
    </FormKit.Panel>
  )
}
