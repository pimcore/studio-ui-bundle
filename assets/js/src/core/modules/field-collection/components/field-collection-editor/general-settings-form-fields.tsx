/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@sdk/components'
import React, { useMemo } from 'react'
import { Input } from '@Pimcore/components/input/input'
import { Form } from '@Pimcore/components/form/form'
import { useTranslation } from 'react-i18next'

export const FieldCollectionGeneralSettingsFormFields = (): React.JSX.Element => {
  const { t } = useTranslation()

  return useMemo(() => (
    <>
      <FormKit.Panel title={ t('field-collection.general-settings.title') }>
        <Form.Item
          label={ t('field-collection.general-settings.key') }
          name="id"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label={ t('field-collection.general-settings.title-label') }
          name="title"
          rules={ [{ required: true, message: t('field-collection.general-settings.enter-title') }] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('field-collection.general-settings.group') }
          name="group"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('field-collection.general-settings.parent-class') }
          name="parentClass"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('field-collection.general-settings.implements-interfaces') }
          name="implementsInterfaces"
        >
          <Input />
        </Form.Item>
      </FormKit.Panel>
    </>
  ), [])
}
