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
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { InputNumber } from '@Pimcore/components/input-number/input-number'

export const DynamicTypePipelineGridTransformersSubstringComponent = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <Form.Item
        initialValue={ 0 }
        label={ t('grid.advanced-column.start') }
        name={ 'start' }
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label={ t('grid.advanced-column.length') }
        name={ 'length' }
      >
        <InputNumber />
      </Form.Item>
    </>
  )
}
