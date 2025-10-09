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

export const DynamicTypePipelineGridTransformersStringReplaceComponent = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      <Form.Item
        label={ t('grid.advanced-column.find') }
        name={ 'find' }
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={ t('grid.advanced-column.replace') }
        name={ 'replace' }
      >
        <Input />
      </Form.Item>
    </>
  )
}
