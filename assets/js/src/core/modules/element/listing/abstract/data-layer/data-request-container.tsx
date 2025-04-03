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

import React, { useEffect, useMemo } from 'react'
import { useSettings } from '../settings/use-settings'
import { useData } from './provider/data/use-data'

export const DataRequestContainer = (): React.JSX.Element => {
  const { ViewComponent, useDataQueryHelper, useDataQuery } = useSettings()
  const { getArgs, dataLoadingState, setDataLoadingState } = useDataQueryHelper()
  const dataQueryResult = useDataQuery(getArgs(), { skip: dataLoadingState !== 'config-changed' && dataLoadingState !== 'data-available' })
  const { setDataQueryResult, setData } = useData()

  useEffect(() => {
    if (!dataQueryResult.isLoading && dataLoadingState === 'config-changed') {
      void dataQueryResult.refetch()
      setDataLoadingState('data-available')
    }
  }, [dataLoadingState])

  useEffect(() => {
    setDataQueryResult(dataQueryResult)
  }, [dataQueryResult])

  useEffect(() => {
    if (dataQueryResult.isSuccess) {
      setData(dataQueryResult.data)
      setDataLoadingState('data-available')
    }
  }, [dataQueryResult.data, dataQueryResult.isSuccess])

  return useMemo(() => (
    <ViewComponent />
  ), [])
}
