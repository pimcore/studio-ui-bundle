/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useMemo, useState } from 'react'
import { isEqual, isNull } from 'lodash'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

interface ReportFormData extends BundleCustomReportsDetails {}

interface IUseReportFormStateReturn {
  originalData: ReportFormData | null
  currentData: ReportFormData | null
  isDirty: boolean
  initializeForm: (data: ReportFormData) => void
  updateFormData: (data: Partial<ReportFormData>) => void
  markFormSaved: () => void
}

export const useReportFormState = (initialData?: ReportFormData): IUseReportFormStateReturn => {
  const [originalData, setOriginalData] = useState<ReportFormData | null>(initialData ?? null)
  const [currentData, setCurrentData] = useState<ReportFormData | null>(initialData ?? null)

  const initializeForm = useCallback((data: ReportFormData) => {
    setOriginalData({ ...data })
    setCurrentData({ ...data })
  }, [])

  const updateFormData = useCallback((data: Partial<ReportFormData>) => {
    setCurrentData(prev => !isNull(prev) ? { ...prev, ...data } : null)
  }, [])

  const markFormSaved = useCallback(() => {
    if (!isNull(currentData)) {
      setOriginalData({ ...currentData })
    }
  }, [currentData])

  const isDirty = useMemo(() => {
    if (isNull(originalData) || isNull(currentData)) return false

    return !isEqual(originalData, currentData)
  }, [originalData, currentData])

  return {
    originalData,
    currentData,
    isDirty,
    initializeForm,
    updateFormData,
    markFormSaved
  }
}
