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
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { type DynamicTypeCustomReportDefinitionRegistry } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'

export const SourceDefinition = ({ form, currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [currentSourceDefinition, setCurrentSourceDefinition] = useState<string | undefined>(
    (currentData.dataSourceConfig as ISourceDefinition)?.type
  )

  const isEmptySourceDefinitionConfig = isUndefined(currentSourceDefinition)

  const sourceDefinitionService = container.get<DynamicTypeCustomReportDefinitionRegistry>(serviceIds['DynamicTypes/CustomReportDefinitionRegistry'])
  const adapters = sourceDefinitionService.getDynamicTypes()
  const currentAdapter = !isEmptySourceDefinitionConfig ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined

  const sourceDefinitionOptions = useMemo(() => adapters.map(adapter => ({
    key: adapter.id,
    label: adapter.getLabel()
  })), [adapters])

  const handleSourceDefinitionTypeUpdate = (type: string): void => {
    form?.resetFields(['dataSourceConfig'])
    form?.setFieldsValue({ dataSourceConfig: { type } })

    updateFormData?.({ ...currentData, dataSourceConfig: { type } })

    setCurrentSourceDefinition(type)
  }

  const renderAddButton = (): React.JSX.Element => {
    return (
      <Dropdown
        menu={ {
          items: sourceDefinitionOptions,
          onClick: (e) => { handleSourceDefinitionTypeUpdate(e.key) }
        } }
        trigger={ ['click'] }
      >
        <IconTextButton
          className={ styles.dropdownButton }
          data-testid="report-source-add-button"
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
      <Flex
        gap="extra-small"
        vertical
      >
        <Form.Group name="dataSourceConfig">
          <Form.Item
            label={ t('reports.editor.source-definition.select-source-definition') }
            name="type"
          >
            <Select
              data-testid="report-source-type-select"
              fieldNames={ { label: 'label', value: 'key' } }
              onChange={ (value: string) => { handleSourceDefinitionTypeUpdate(value) } }
              options={ sourceDefinitionOptions }
            />
          </Form.Item>
          {currentAdapter?.getCustomReportData({ currentData, updateFormData, form })}
        </Form.Group>
      </Flex>
      )}
    </FormKit.Panel>
  )
}
