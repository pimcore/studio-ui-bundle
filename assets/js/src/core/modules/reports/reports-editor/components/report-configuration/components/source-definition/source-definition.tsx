/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Text } from '@Pimcore/components/text/text'
import { type IReportConfigurationSectionProps, type ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'
import { Select } from '@Pimcore/components/select/select'
import { type DynamicTypeDefinitionRegistry } from '@Pimcore/modules/reports/dynamic-types/definitions/definition-adapters/dynamic-type-definition-registry'

export const SourceDefinition = ({ currentData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const dataSourceType = (currentData.dataSourceConfig as ISourceDefinition)?.type

  const [currentSourceDefinition, setCurrentSourceDefinition] = useState<string | undefined>(dataSourceType)

  const isEmptySourceDefinitionConfig = isUndefined(currentSourceDefinition)

  const sourceDefinitionService = container.get<DynamicTypeDefinitionRegistry>(serviceIds['DynamicTypes/ReportDefinitionRegistry'])
  const adapters = sourceDefinitionService.getDynamicTypes()
  const currentAdapter = !isEmptySourceDefinitionConfig ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined

  const dropdownItems = useMemo(() => adapters.map(adapter => ({
    key: adapter.id,
    label: adapter.label,
    onClick: () => { setCurrentSourceDefinition(adapter.id) }
  })), [adapters])

  const selectOptions = useMemo(() => adapters.map(adapter => ({
    value: adapter.id,
    label: adapter.label
  })), [adapters])

  const renderAddButton = (): React.JSX.Element => {
    return (
      <Dropdown
        menu={ { items: dropdownItems } }
        trigger={ ['click'] }
      >
        <IconTextButton
          className={ styles.dropdownButton }
          icon={ { value: 'plus-circle' } }
        >
          {t('add')}
        </IconTextButton>
      </Dropdown>
    )
  }

  return (
    <FormKit.Panel
      extra={ isEmptySourceDefinitionConfig && renderAddButton() }
      extraPosition="start"
      title={ t('reports.editor.source-definition.title') }
    >
      {isEmptySourceDefinitionConfig && (
        <Text type="secondary">
          {t('reports.editor.source-definition.no-content')}
        </Text>
      )}
      {!isEmptySourceDefinitionConfig && (
        <Form.Item label={ t('reports.editor.source-definition.select-source-definition') }>
          <Select
            options={ selectOptions }
            value={ currentSourceDefinition }
          />
        </Form.Item>
      )}
      {currentAdapter?.getElement({
        currentData,
        updateFormData: (data) => {
          console.log('----- data: ', data)
        }
      })}
    </FormKit.Panel>
  )
}
