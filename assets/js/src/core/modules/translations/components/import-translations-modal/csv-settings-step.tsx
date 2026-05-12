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
import { IconButton, Flex, FormKit, Form, Input, type formInstanceType } from '@sdk/components'
import { Spin } from 'antd'
import { t } from 'i18next'
import { useStyle } from './import-translations-modal.styles'
import { formatDataUnit } from '@Pimcore/utils/data-unit'
import type { CsvSettings } from './types'
import { DEFAULT_CSV_SETTINGS } from './types'

interface CsvSettingsStepProps {
  selectedFile: File
  isDetecting: boolean
  isImporting: boolean
  csvSettings: CsvSettings | null
  form: formInstanceType<CsvSettings>
  onBack: () => void
}

export const CsvSettingsStep = ({
  selectedFile,
  isDetecting,
  isImporting,
  csvSettings,
  form,
  onBack
}: CsvSettingsStepProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <>
      <div className={ styles.uploadedFile }>
        <Flex
          align="start"
          gap={ 10 }
        >
          <Flex>
            <div>
              <div className="file-name">{selectedFile.name}</div>
              <div className="file-size">{formatDataUnit(selectedFile.size)}</div>
            </div>
          </Flex>
          {!isImporting && (
            <IconButton
              icon={ { value: 'close' } }
              onClick={ onBack }
              type="link"
              variant="minimal"
            />
          )}
        </Flex>
      </div>

      {isDetecting
        ? (
          <Flex
            align="center"
            className={ styles.spinnerContainer }
            justify="center"
          >
            <Spin />
          </Flex>
          )
        : (
          <FormKit
            formProps={ {
              form,
              component: false,
              initialValues: csvSettings ?? DEFAULT_CSV_SETTINGS
            } }
          >
            <FormKit.Panel title={ t('translations.import.modal.csv-settings') }>
              <Form.Item
                label={ t('translations.import.modal.delimiter') }
                name="delimiter"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.quotechar') }
                name="quoteChar"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.escapechar') }
                name="escapeChar"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('translations.import.modal.lineterminator') }
                name="lineTerminator"
                rules={ [{ required: true, message: t('translations.import.modal.field-required') }] }
              >
                <Input />
              </Form.Item>
            </FormKit.Panel>
          </FormKit>
          )}
    </>
  )
}
