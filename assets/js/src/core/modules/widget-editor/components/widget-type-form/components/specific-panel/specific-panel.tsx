/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { ManyToOneRelation } from '@Pimcore/components/many-to-one-relation'
import { Switch } from '@Pimcore/components/switch/switch'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { usePrevious } from '@sdk/utils'
import { InputNumber } from 'antd'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ElementTypeSelect } from '../../../element-type-select/element-type-select'
import { useWidgetFormContext } from '../../context/hooks/use-widget-form-context'

export const SpecificPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useWidgetFormContext()
  const elementType = Form.useWatch('elementType', form)
  const previousElementType = usePrevious(elementType)

  useEffect(() => {
    // Only reset the rootFolder when elementType actually changes (not on initial render)
    if (!isNil(previousElementType)) {
      form.setFieldValue('rootFolder', null)
    }
  }, [previousElementType, form])

  return (
    <FormKit.Panel
      collapsed={false}
      collapsible
      title={t('widget-editor.widget-form.specific.title')}
    >
      <Form.Item
        label={t('widget-editor.widget-form.specific.element-type')}
        name="elementType"
      >
        <ElementTypeSelect />
      </Form.Item>

      <Form.Item
        label={t('widget-editor.widget-form.specific.root-folder')}
        name="rootFolder"
      >
        <ManyToOneRelation
          allowToClearRelation
          assetsAllowed={elementType === elementTypes.asset}
          dataObjectsAllowed={elementType === elementTypes.dataObject}
          documentsAllowed={elementType === elementTypes.document}
          key={elementType}
        />
      </Form.Item>

      <Form.Item
        name="showRoot"
      >
        <Switch labelRight={t('widget-editor.widget-form.specific.show-root')} />
      </Form.Item>

      <Form.Item
        label={t('widget-editor.widget-form.specific.page-size')}
        name="pageSize"
      >
        <InputNumber />
      </Form.Item>
    </FormKit.Panel>
  )
}
