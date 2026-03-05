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
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { useTranslation } from 'react-i18next'
import type { TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export const ResizeVideoTransformationComponent: TransformationComponent = () => {
  const { t } = useTranslation()

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label={ t('video-thumbnails.transformations.resize.width') }
        name="width"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        extra={ t('video-thumbnails.transformations.resize.even-number-hint') }
        label={ t('video-thumbnails.transformations.resize.height') }
        name="height"
      >
        <InputNumber />
      </Form.Item>
    </Flex>
  )
}

ResizeVideoTransformationComponent.displayName = 'ResizeVideoTransformationComponent'
