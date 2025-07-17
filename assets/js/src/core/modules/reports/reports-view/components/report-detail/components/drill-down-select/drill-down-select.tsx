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
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useCustomReportsListDrillDownOptionsQuery, type BundleCustomReportsColumnConfiguration } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { useGridContext } from '@Pimcore/modules/reports/reports-view/context/grid-context'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

interface IDrillDownSelectListProps {
  reportName: string
  field: BundleCustomReportsColumnConfiguration
}

export const DrillDownSelect = ({ reportName, field }: IDrillDownSelectListProps): React.JSX.Element => {
  const { filters, setFilters } = useGridContext()

  const { data, isLoading } = useCustomReportsListDrillDownOptionsQuery({ body: { name: reportName, field: field.name ?? null } })
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [currentValue, setCurrentValue] = useState<string | null>(null)

  const handleSelectChange = (value: string | null): void => {
    setCurrentValue(value)

    const drillDownFilters = { ...(filters?.drillDownFilters ?? {}) }

    drillDownFilters[field.name!] = String(value)

    setFilters({
      ...filters,
      drillDownFilters
    })
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Text className={ styles.drillDownSelectLabel }>{field.label}</Text>
      <Select
        className='min-w-200'
        loading={ isLoading }
        onSelect={ handleSelectChange }
        options={ data?.items?.map((item) => ({
          label: item.name,
          value: item.value
        })) }
        placeholder={ t('select') }
        value={ currentValue }
      />
    </Flex>
  )
}
