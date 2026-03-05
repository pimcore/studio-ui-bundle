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
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import type { TransformationComponent } from '../../types/transformation-component-types'

export const GaussianBlurTransformationComponent: TransformationComponent = () => {
  const { t } = useTranslation()

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue={ 0 }
        label={ t('image-thumbnails.transformations.gaussian-blur.radius') }
        name="radius"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={ 1 }
        label={ t('image-thumbnails.transformations.gaussian-blur.sigma') }
        name="sigma"
      >
        <InputNumber />
      </Form.Item>
    </Flex>
  )
}
