/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Form } from '@Pimcore/components/form/form'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { type NamePath } from 'antd/es/form/interface'
import { BatchAppendMode } from '@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode'
import { useTranslation } from 'react-i18next'

interface BatchEditFormItemProps {
  name: NamePath
  component: React.ReactNode
  supportsBatchAppendModes: boolean
}

export const BatchEditFormItem = ({ name, component, supportsBatchAppendModes }: BatchEditFormItemProps): React.JSX.Element => {
  const { t } = useTranslation()
  if (!supportsBatchAppendModes) {
    return (
      <Form.Item
        initialValue={ null }
        name={ name }
      >
        {component}
      </Form.Item>
    )
  }

  return (
    <Form.Group name={ name }>
      <Form.Item
        initialValue={ BatchAppendMode.Replace } // Set initial value
        name="action"
      >
        <Segmented
          options={ [
            { label: t('batch-edit.append-mode.replace'), value: BatchAppendMode.Replace },
            { label: t('batch-edit.append-mode.add'), value: BatchAppendMode.Add },
            { label: t('batch-edit.append-mode.remove'), value: BatchAppendMode.Remove }
          ] }
        />
      </Form.Item>

      <Form.Item
        initialValue={ null } // Set initial value if needed
        name="data"
      >
        {component}
      </Form.Item>
    </Form.Group>
  )
}
