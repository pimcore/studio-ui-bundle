/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo, useState } from 'react'
import { isEqual, isNull } from 'lodash'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export type ReportFormData = BundleCustomReportsDetails

interface IUseReportFormStateReturn {
  initialData: ReportFormData | null
  currentData: ReportFormData | null
  isDirty: boolean
  initializeForm: (data: ReportFormData) => void
  updateFormData: (data: Partial<ReportFormData>) => void
  markFormSaved: () => void
}

export const useReportFormState = (): IUseReportFormStateReturn => {
  const [initialData, setInitialData] = useState<ReportFormData | null>(null)
  const [currentData, setCurrentData] = useState<ReportFormData | null>(null)

  const initializeForm = (data: ReportFormData): void => {
    setInitialData({ ...data })
    setCurrentData({ ...data })
  }

  const updateFormData = (data: Partial<ReportFormData>): void => {
    setCurrentData(prev => !isNull(prev) ? { ...prev, ...data } : null)
  }

  const markFormSaved = (): void => {
    !isNull(currentData) && setInitialData({ ...currentData })
  }

  const isDirty = useMemo(() => {
    if (isNull(initialData) || isNull(currentData)) return false

    return !isEqual(initialData, currentData)
  }, [initialData, currentData])

  return {
    initialData,
    currentData,
    isDirty,
    initializeForm,
    updateFormData,
    markFormSaved
  }
}
