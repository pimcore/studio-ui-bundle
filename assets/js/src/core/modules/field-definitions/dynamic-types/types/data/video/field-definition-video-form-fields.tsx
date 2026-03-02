/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, Input, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation'

export const FieldDefinitionVideoFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const videoTypeOptions = [
    { label: t('video.type.asset'), value: 'asset' },
    { label: t('video.type.youtube'), value: 'youtube' },
    { label: t('video.type.vimeo'), value: 'vimeo' },
    { label: t('video.type.dailymotion'), value: 'dailymotion' }
  ]

  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={ t('height') }
        name="height"
        tooltip={ t('height-tooltip') }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('upload-path') }
        name="uploadPath"
      >
        <ManyToOneRelation
          allowToClearRelation
          allowedAssetTypes={ ['folder'] }
          assetsAllowed
        />
      </Form.Item>

      <Form.Item
        label={ t('allowed-video-types') }
        name="allowedTypes"
        tooltip={ t('allowed-video-types-tooltip') }
      >
        <Select
          mode="multiple"
          options={ videoTypeOptions }
        />
      </Form.Item>
    </>
  )
}
