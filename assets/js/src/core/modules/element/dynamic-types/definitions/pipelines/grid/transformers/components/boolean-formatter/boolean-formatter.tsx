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
import { Input } from '@Pimcore/components/input/input'

export const DynamicTypePipelineGridTransformersBooleanFormatterComponent = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <Form.Item
        initialValue={ t('yes') }
        label={ t('grid.advanced-column.trueLabel') }
        name={ 'trueLabel' }
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={ t('no') }
        label={ t('grid.advanced-column.falseLabel') }
        name={ 'falseLabel' }
      >
        <Input />
      </Form.Item>
    </>
  )
}
