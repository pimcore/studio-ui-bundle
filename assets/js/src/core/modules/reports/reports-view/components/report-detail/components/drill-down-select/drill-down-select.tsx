/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useCustomReportsListDrillDownOptionsMutation } from '@Pimcore/modules/reports/custom-reports-api-slice-inhanced'
import { useGridContext } from '@Pimcore/modules/reports/reports-view/context/grid-context'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'
import { clone, findIndex } from 'lodash'

interface IDrillDownSelectListProps {
  reportName: string
  field: { label: string, name: string }
}

export const DrillDownSelect = ({ reportName, field, ...props }: IDrillDownSelectListProps): React.JSX.Element => {
  const { filters, setFilters } = useGridContext()

  const [fetchDrillDownOptions, { data, isLoading }] = useCustomReportsListDrillDownOptionsMutation()
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [currentValue, setCurrentValue] = useState<string | null>(null)

  const fetchOptions = (): void => {
    fetchDrillDownOptions({ body: { name: reportName, field: field.name } })
      .catch(error => { console.log('Error while fetching drill down options:', error) })
  }

  const handleSelectChange = (value: string | null): void => {
    setCurrentValue(value)

    const columnFilters = clone(filters?.columnFilters) ?? []
    const fieldIndex = findIndex(columnFilters, { property: field.name })

    if (fieldIndex > -1) {
      columnFilters[fieldIndex].value = value
    } else {
      columnFilters.push({ property: field.name, value })
    }

    setFilters({
      ...filters,
      columnFilters
    })
  }

  useEffect(() => {
    fetchOptions()
  }, [reportName, field])

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
