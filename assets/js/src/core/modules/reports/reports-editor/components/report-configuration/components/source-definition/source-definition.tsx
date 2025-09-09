/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isNull, isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Text } from '@Pimcore/components/text/text'
import { type IReportConfigurationSectionProps, type ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'
import { Select } from '@Pimcore/components/select/select'
import {
  type DynamicTypeDefinitionRegistry
} from '@Pimcore/modules/reports/dynamic-types/definitions/definition-adapters/dynamic-type-definition-registry'

const SOURCE_DEFINITION_OPTIONS = [
  { value: 'Sql', label: 'sql' }
]

export const SourceDefinition = ({ currentData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const dataSourceConfig = currentData.dataSourceConfig as ISourceDefinition
  const dataSourceType = dataSourceConfig?.type

  const [currentSourceDefinition, setCurrentSourceDefinition] = useState<string | undefined>(dataSourceType)

  const isEmptySourceDefinitionConfig = isNull(dataSourceConfig) && isUndefined(currentSourceDefinition)
  const dropdownItems = [
    {
      key: 'sql',
      label: 'Sql',
      onClick: () => { setCurrentSourceDefinition('sql') }
    }
  ]

  const sourceDefinitionService = container.get<DynamicTypeDefinitionRegistry>(serviceIds['DynamicTypes/ReportDefinitionRegistry'])
  const adapters = sourceDefinitionService.getDynamicTypes()
  const currentAdapter = !isUndefined(currentSourceDefinition) ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined

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
        <Select
          options={ SOURCE_DEFINITION_OPTIONS }
          value={ currentSourceDefinition }
        />
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
