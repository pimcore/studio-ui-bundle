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
import { useCustomReportsListDrillDownOptionsMutation } from '@Pimcore/modules/reports/custom-reports-api-slice-inhanced'

interface IDrillDownSelectListProps {
  reportName: string
  field: string
}

export const DrillDownSelect = ({ reportName, field }: IDrillDownSelectListProps): React.JSX.Element => {
  const [fetchDrillDownOptions, { data, isLoading }] = useCustomReportsListDrillDownOptionsMutation()
  const { t } = useTranslation()

  const [currentValue, setCurrentValue] = useState<string | null>(null)

  const fetchOptions = (): void => {
    fetchDrillDownOptions({ body: { name: reportName, field } })
      .catch(error => { console.log('Error while fetching drill down options:', error) })
  }

  useEffect(() => {
    fetchOptions()
  }, [reportName, field])

  return (
    <Select
      className='min-w-200'
      loading={ isLoading }
      onChange={ (value: string) => { setCurrentValue(value) } }
      options={ data?.items }
      placeholder={ t('select') }
      value={ currentValue }
    />
  )
}
