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
import { isNull } from 'lodash'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Text } from '@Pimcore/components/text/text'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'

export const SourceDefinition = ({ currentData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const dataSourceConfig = currentData.dataSourceConfig
  const isEmptySourceDefinitionConfig = isNull(dataSourceConfig)

  const [currentSourceDefinition, setCurrentSourceDefinition] = useState<string | null>(null)

  const dropdownItems = [
    {
      key: 'sql',
      label: 'Sql',
      onClick: () => { setCurrentSourceDefinition('sql') }
    }
  ]

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
    </FormKit.Panel>
  )
}
