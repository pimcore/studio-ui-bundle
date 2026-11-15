/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { type ReportFormData, useReportFormState } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { ColumnConfiguration } from './column-configuration'

const mockGridProps = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('../../report-configuration.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/form/form-kit', () => ({
  FormKit: { Panel: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }
}))
jest.mock('@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns', () => ({
  useColumns: () => []
}))
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: (props: unknown) => {
    mockGridProps(props)

    return <div />
  }
}))

const details = {
  name: 'r',
  niceName: 'Original',
  iconClass: null,
  groupIconClass: null,
  columnConfigurations: [{ id: 'c1', name: 'c1', displayType: 'text' }]
} as unknown as BundleCustomReportsDetails

describe('ColumnConfiguration', () => {
  it('keeps edits made elsewhere in the form when the columns change', () => {
    const { result } = renderHook(() => useReportFormState())

    act(() => { result.current.initializeForm(details) })

    // the Grid callback of this render closes over the data from before the display name edit
    render(
      <ColumnConfiguration
        currentData={ result.current.currentData! }
        updateFormData={ result.current.updateFormData }
      />
    )
    const staleOnUpdateCellData = mockGridProps.mock.calls.at(-1)?.[0].onUpdateCellData

    act(() => { result.current.updateFormData({ niceName: 'Edited' }) })
    act(() => { staleOnUpdateCellData({ rowIndex: 0, columnId: 'name', value: 'renamed' }) })

    expect(result.current.currentData?.niceName).toBe('Edited')
    expect(result.current.currentData?.columnConfigurations[0]).toEqual(expect.objectContaining({ name: 'renamed' }))
  })
})
