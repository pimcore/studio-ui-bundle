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
import { FieldDefinitionCropPanel } from '@Pimcore/modules/field-definitions/dynamic-types/components/field-definition-crop-panel/field-definition-crop-panel'
import { Form, Input } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ManyToOneRelationPath } from '@Pimcore/components/many-to-one-relation'

export const FieldDefinitionImageGalleryFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

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

      {!isCustomLayout && (
      <>
        <Form.Item
          label={ t('upload-path') }
          name="uploadPath"
        >
          <ManyToOneRelationPath
            allowToClearRelation
            allowedAssetTypes={ ['folder'] }
            assetsAllowed
          />
        </Form.Item>

        <FieldDefinitionCropPanel />
      </>
      )
        }
    </>
  )
}
