/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import type { TransformationComponent } from '../../types/transformation-component-types'

export const CoverTransformationComponent: TransformationComponent = () => {
  const { t } = useTranslation()

  const positioningOptions = useMemo(() => [
    { value: 'center', label: t('image-thumbnails.transformations.cover.positioning-center') },
    { value: 'topleft', label: t('image-thumbnails.transformations.cover.positioning-topleft') },
    { value: 'topright', label: t('image-thumbnails.transformations.cover.positioning-topright') },
    { value: 'bottomleft', label: t('image-thumbnails.transformations.cover.positioning-bottomleft') },
    { value: 'bottomright', label: t('image-thumbnails.transformations.cover.positioning-bottomright') }
  ], [t])

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label={ t('image-thumbnails.transformations.cover.width') }
        name="width"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.transformations.cover.height') }
        name="height"
      >
        <InputNumber />
      </Form.Item>

      <p style={ { margin: 0 } }>
        {t('image-thumbnails.transformations.cover.focal-point-info')}
      </p>

      <Form.Item
        initialValue="center"
        label={ t('image-thumbnails.transformations.cover.positioning') }
        name="positioning"
      >
        <Select options={ positioningOptions } />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.transformations.cover.force-resize') }
        name="forceResize"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </Flex>
  )
}

CoverTransformationComponent.displayName = 'CoverTransformationComponent'
