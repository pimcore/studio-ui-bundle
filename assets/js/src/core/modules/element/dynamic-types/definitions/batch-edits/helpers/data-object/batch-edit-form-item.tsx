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
import { Form } from '@Pimcore/components/form/form'
import { Segmented } from '@Pimcore/components/segmented/segmented'
import { type NamePath } from 'antd/es/form/interface'
import { BatchAppendMode } from '@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode'
import { useTranslation } from 'react-i18next'
import { type BatchEditLocaleItem } from './use-batch-edit-locales'

interface BatchEditFormItemProps {
  items: BatchEditLocaleItem[]
  component: React.ReactNode
  supportsBatchAppendModes: boolean
}

export const BatchEditFormItem = ({ items, component, supportsBatchAppendModes }: BatchEditFormItemProps): React.JSX.Element => {
  const { t } = useTranslation()

  // For localizable fields one entry per language is rendered; all stay mounted so
  // every edited language is submitted, only the selected language is visible.
  // Form.Group renders no DOM, so append-mode entries are hidden via their inner
  // Form.Items. initialValue is applied only when applyInitialValue is set: for the
  // per-language items of a localized field a default would overwrite untouched
  // translations, so it is omitted there. See useBatchEditLocales and issue #2492.
  const renderEntry = (key: string, name: NamePath, hidden: boolean, applyInitialValue: boolean): React.JSX.Element => {
    if (!supportsBatchAppendModes) {
      return (
        <Form.Item
          hidden={ hidden }
          initialValue={ applyInitialValue ? null : undefined }
          key={ key }
          name={ name }
        >
          {component}
        </Form.Item>
      )
    }

    return (
      <Form.Group
        key={ key }
        name={ name }
      >
        <Form.Item
          hidden={ hidden }
          initialValue={ applyInitialValue ? BatchAppendMode.Replace : undefined } // Set initial value
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
          hidden={ hidden }
          initialValue={ applyInitialValue ? null : undefined } // Set initial value if needed
          name="data"
        >
          {component}
        </Form.Item>
      </Form.Group>
    )
  }

  return (
    <>
      {items.map(({ key, name, hidden, applyInitialValue }) => renderEntry(key, name, hidden, applyInitialValue))}
    </>
  )
}
