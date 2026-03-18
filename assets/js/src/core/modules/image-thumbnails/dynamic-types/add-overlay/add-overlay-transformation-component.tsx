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
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import type { TransformationComponent } from '../../types/transformation-component-types'

const compositeOptions = [
  { value: 'COMPOSITE_DEFAULT', label: 'COMPOSITE_DEFAULT' },
  { value: 'COMPOSITE_EXCLUSION', label: 'COMPOSITE_EXCLUSION' },
  { value: 'COMPOSITE_HARDLIGHT', label: 'COMPOSITE_HARDLIGHT' }
]

export const AddOverlayTransformationComponent: TransformationComponent = () => {
  const { t } = useTranslation()

  const originOptions = useMemo(() => [
    { value: 'top-left', label: t('image-thumbnails.transformations.add-overlay.origin-top-left') },
    { value: 'top-right', label: t('image-thumbnails.transformations.add-overlay.origin-top-right') },
    { value: 'center', label: t('image-thumbnails.transformations.add-overlay.origin-center') },
    { value: 'bottom-left', label: t('image-thumbnails.transformations.add-overlay.origin-bottom-left') },
    { value: 'bottom-right', label: t('image-thumbnails.transformations.add-overlay.origin-bottom-right') }
  ], [t])

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label={ t('image-thumbnails.transformations.add-overlay.overlay-image') }
        name="asset"
      >
        <ImagePicker
          allowedTypes={ ['image'] }
          height={ 150 }
          type="add"
          width={ 300 }
        />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label={ t('image-thumbnails.transformations.add-overlay.x') }
        name="x"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label={ t('image-thumbnails.transformations.add-overlay.y') }
        name="y"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue="top-left"
        label={ t('image-thumbnails.transformations.add-overlay.origin') }
        name="origin"
      >
        <Select options={ originOptions } />
      </Form.Item>
      <Form.Item
        initialValue={ 100 }
        label={ t('image-thumbnails.transformations.add-overlay.alpha') }
        name="alpha"
      >
        <InputNumber
          max={ 100 }
          min={ 0 }
        />
      </Form.Item>
      <Form.Item
        initialValue="COMPOSITE_DEFAULT"
        label={ t('image-thumbnails.transformations.add-overlay.composite') }
        name="composite"
      >
        <Select options={ compositeOptions } />
      </Form.Item>
    </Flex>
  )
}

AddOverlayTransformationComponent.displayName = 'AddOverlayTransformationComponent'
