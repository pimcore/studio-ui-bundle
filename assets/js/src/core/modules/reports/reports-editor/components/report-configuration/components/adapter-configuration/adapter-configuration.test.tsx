/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { isUndefined } from 'lodash'
import { render, screen } from '@testing-library/react'
import { DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { type ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { AdapterConfiguration } from './adapter-configuration'

const mockGetDynamicType = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ getDynamicType: mockGetDynamicType }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration', () => ({
  ColumnConfiguration: () => <div data-testid="generic-column-configuration" />
}))
jest.mock('@Pimcore/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings', () => ({
  ChartSettings: () => <div data-testid="generic-chart-settings" />
}))

class GenericAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'generic'
  getLabel (): ReactElement { return <>Generic</> }
  getPagination (): boolean { return true }
  getCustomReportData (): ReactElement { return <></> }
}

const customEditorProps = jest.fn()

class CustomEditorAdapter extends GenericAdapter {
  id = 'custom'

  getCustomReportEditor (props: IReportConfigurationSectionProps): ReactElement {
    customEditorProps(props)

    return <div data-testid="custom-editor" />
  }
}

const reportData = (type?: string): ReportFormData => ({
  name: 'report',
  dataSourceConfig: isUndefined(type) ? null : { type }
}) as unknown as ReportFormData

const expectGenericSections = (): void => {
  expect(screen.getByTestId('generic-column-configuration')).toBeInTheDocument()
  expect(screen.getByTestId('generic-chart-settings')).toBeInTheDocument()
}

describe('AdapterConfiguration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the generic sections when no source definition is selected', () => {
    render(<AdapterConfiguration currentData={ reportData() } />)

    expectGenericSections()
    expect(mockGetDynamicType).not.toHaveBeenCalled()
  })

  it('renders the generic sections when the adapter does not override the editor', () => {
    mockGetDynamicType.mockReturnValue(new GenericAdapter())

    render(<AdapterConfiguration currentData={ reportData('generic') } />)

    expectGenericSections()
  })

  it('renders the generic sections for an adapter without the editor method', () => {
    mockGetDynamicType.mockReturnValue({ id: 'legacy', getLabel: () => <>Legacy</>, getPagination: () => true })

    render(<AdapterConfiguration currentData={ reportData('legacy') } />)

    expectGenericSections()
  })

  it('renders the generic sections for an unknown adapter', () => {
    mockGetDynamicType.mockReturnValue(undefined)

    render(<AdapterConfiguration currentData={ reportData('unknown') } />)

    expectGenericSections()
  })

  it('replaces the generic sections with the adapter editor', () => {
    mockGetDynamicType.mockReturnValue(new CustomEditorAdapter())
    const currentData = reportData('custom')
    const updateFormData = jest.fn()

    render(
      <AdapterConfiguration
        currentData={ currentData }
        updateFormData={ updateFormData }
      />
    )

    expect(screen.getByTestId('custom-editor')).toBeInTheDocument()
    expect(screen.queryByTestId('generic-column-configuration')).not.toBeInTheDocument()
    expect(screen.queryByTestId('generic-chart-settings')).not.toBeInTheDocument()
    expect(mockGetDynamicType).toHaveBeenCalledWith('custom', false)
    expect(customEditorProps).toHaveBeenCalledWith({ currentData, updateFormData, form: undefined })
  })
})
