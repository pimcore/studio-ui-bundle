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
import { Input } from '@Pimcore/components/input/input'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCommitKeyedListDefault } from '@Pimcore/components/form/controls/keyed-list/hooks/use-commit-keyed-list-default'

export const DynamicTypePipelineGridTransformersCombineComponent = (): React.JSX.Element => {
  const { t } = useTranslation()

  // an untouched default glue must still be part of the saved config (see the hook's docs)
  useCommitKeyedListDefault('glue', ' ')

  return (
    <Form.Item
      label={ t('glue') }
      name={ 'glue' }
    >
      <Input />
    </Form.Item>
  )
}
