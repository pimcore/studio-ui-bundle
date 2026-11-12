/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import {
  createSectionPropsComparator,
  PERMISSION_FIELDS
} from '@Pimcore/modules/reports/reports-editor/components/report-configuration/helpers'

const dataSourceConfig = { type: 'sql' }
const sharedUserNames: string[] = []

const data = (overrides: Record<string, unknown> = {}): ReportFormData => ({
  name: 'r',
  niceName: 'n',
  sharedGlobally: false,
  sharedUserNames,
  dataSourceConfig,
  ...overrides
}) as unknown as ReportFormData

describe('createSectionPropsComparator', () => {
  const update = jest.fn()

  it('mode "except" ignores the given fields only', () => {
    const isEqual = createSectionPropsComparator([...PERMISSION_FIELDS, 'niceName'], 'except')
    const prev = { currentData: data(), updateFormData: update }

    expect(isEqual(prev, { currentData: data({ niceName: 'x', sharedGlobally: true }), updateFormData: update })).toBe(true)
    expect(isEqual(prev, { currentData: { ...prev.currentData, dataSourceConfig: { type: 'sql' } }, updateFormData: update })).toBe(false)
    expect(isEqual(prev, { currentData: data({ extra: 1 }), updateFormData: update })).toBe(false)
  })

  it('mode "only" compares just the given fields', () => {
    const isEqual = createSectionPropsComparator(PERMISSION_FIELDS, 'only')
    const prev = { currentData: data(), updateFormData: update }

    expect(isEqual(prev, { currentData: { ...prev.currentData, niceName: 'x' }, updateFormData: update })).toBe(true)
    expect(isEqual(prev, { currentData: { ...prev.currentData, sharedGlobally: true }, updateFormData: update })).toBe(false)
  })

  it('is not equal when the callback or the form changes', () => {
    const isEqual = createSectionPropsComparator([], 'except')
    const currentData = data()

    expect(isEqual({ currentData, updateFormData: update }, { currentData, updateFormData: jest.fn() })).toBe(false)
  })
})
