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
import { FormKit } from '@Pimcore/components/form/form-kit'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { TextArea } from '@Pimcore/components/textarea/textarea'

export const FilterPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      collapsed={ false }
      collapsible
      title={ t('widget-editor.widget-form.filters.title') }
    >
      <Form.Item
        label={ t('widget-editor.widget-form.filters.pql') }
        name="pql"
      >
        <TextArea />
      </Form.Item>
    </FormKit.Panel>
  )
}
