/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { useReportFormState } from './use-report-form-state'

const details = { name: 'r', niceName: 'n', iconClass: null, groupIconClass: null } as unknown as BundleCustomReportsDetails

describe('useReportFormState', () => {
  it('keeps updateFormData and initializeForm stable across updates', () => {
    const { result } = renderHook(() => useReportFormState())
    const { updateFormData, initializeForm } = result.current

    act(() => { result.current.initializeForm(details) })
    act(() => { result.current.updateFormData({ niceName: 'x' }) })

    expect(result.current.updateFormData).toBe(updateFormData)
    expect(result.current.initializeForm).toBe(initializeForm)
  })

  it('tracks the dirty flag and resets it when the data equals the initial data again', () => {
    const { result } = renderHook(() => useReportFormState())

    act(() => { result.current.initializeForm(details) })
    expect(result.current.isDirty).toBe(false)

    act(() => { result.current.updateFormData({ niceName: 'x' }) })
    expect(result.current.isDirty).toBe(true)

    act(() => { result.current.updateFormData({ niceName: 'n' }) })
    expect(result.current.isDirty).toBe(false)

    act(() => { result.current.updateFormData({ niceName: 'y' }) })
    act(() => { result.current.markFormSaved() })
    expect(result.current.isDirty).toBe(false)
  })
})
