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
import { TranslationMerger } from './translation-merger'
import { getMergerData, clearMergerData } from './merger-data-store'
import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'

interface MergerState {
  domain: string
  deltaItems: DeltaItem[]
}

export const TranslationMergerContainer = (): React.JSX.Element => {
  const [data, setData] = useState<MergerState | null>(null)

  useEffect(() => {
    const mergerData = getMergerData()
    if (mergerData !== null) {
      setData(mergerData)
      clearMergerData()
    }
  }, [])

  if (data === null) {
    return <div>No merge data available.</div>
  }

  return (
    <TranslationMerger
      deltaItems={ data.deltaItems }
      domain={ data.domain }
    />
  )
}
