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
import { type ElementIcon } from '@Pimcore/components/icon/icon'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { normalizeIcon } from '@Pimcore/utils/normalize-icon'

export type ReportFormData = Omit<BundleCustomReportsDetails, 'iconClass' | 'groupIconClass'> & {
  iconClass: ElementIcon | null
  groupIconClass: ElementIcon | null
}

export const normalizeReportFormData = (data: BundleCustomReportsDetails): ReportFormData => ({
  ...data,
  iconClass: normalizeIcon(data?.iconClass),
  groupIconClass: normalizeIcon(data?.groupIconClass)
})

interface IUseReportFormStateReturn {
  initialData: ReportFormData | null
  currentData: ReportFormData | null
  isDirty: boolean
  initializeForm: (data: BundleCustomReportsDetails) => void
  updateFormData: (data: Partial<ReportFormData>) => void
  markFormSaved: () => void
}

export const useReportFormState = (): IUseReportFormStateReturn => {
  const [initialData, setInitialData] = useState<ReportFormData | null>(null)
  const [currentData, setCurrentData] = useState<ReportFormData | null>(null)

  const initializeForm = (data: BundleCustomReportsDetails): void => {
    const normalizedData = normalizeReportFormData(data)

    setInitialData({ ...normalizedData })
    setCurrentData({ ...normalizedData })
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
