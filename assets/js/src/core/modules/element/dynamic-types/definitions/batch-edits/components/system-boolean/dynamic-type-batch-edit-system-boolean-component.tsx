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
import { Select } from '@Pimcore/components/select/select'
import { type AbstractBatchEditDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { Form } from '@Pimcore/components/form/form'

export interface DynamicTypeBatchEditSystemBooleanProps extends AbstractBatchEditDefinition {}

// A system boolean (e.g. "published") is an action on the element, not a field value: an unchecked
// checkbox would silently apply "false" to every selected element. Require an explicit choice instead.
export const DynamicTypeBatchEditSystemBooleanComponent = ({ batchEdit }: DynamicTypeBatchEditSystemBooleanProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { key } = batchEdit

  return (
    <Form.Item
      getValueFromEvent={ (choice: string) => choice === 'publish' }
      getValueProps={ (value?: boolean) => ({ value: value === undefined ? undefined : (value ? 'publish' : 'unpublish') }) }
      name={ key }
      rules={ [{ required: true, message: t('batch-edit.system-boolean.required') }] }
    >
      <Select
        options={ [
          { value: 'publish', label: t('batch-edit.system-boolean.publish') },
          { value: 'unpublish', label: t('batch-edit.system-boolean.unpublish') }
        ] }
        placeholder={ t('batch-edit.system-boolean.placeholder') }
      />
    </Form.Item>
  )
}
