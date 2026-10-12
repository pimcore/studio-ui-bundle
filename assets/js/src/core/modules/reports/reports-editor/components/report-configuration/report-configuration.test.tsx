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
import { render, screen } from '@testing-library/react'
import { ReportConfiguration } from './report-configuration'

jest.mock('@Pimcore/modules/reports/custom-reports-api-slice-enhanced', () => ({
  useCustomReportsReportQuery: () => ({ isLoading: false, isFetching: false, data: {}, refetch: jest.fn() })
}))
jest.mock('@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state', () => ({
  useReportFormState: () => ({
    initializeForm: jest.fn(),
    currentData: { name: 'r', dataSourceConfig: { type: 'custom' } },
    isDirty: false,
    updateFormData: jest.fn(),
    markFormSaved: jest.fn()
  })
}))
jest.mock('@Pimcore/modules/reports/reports-editor/hooks/use-report-actions', () => ({
  useReportActions: () => ({ updateReport: jest.fn() })
}))
jest.mock('@Pimcore/modules/reports/reports-editor/reports-editor', () => {
  const { createContext } = jest.requireActual('react')

  return {
    REFETCH_BTN_PORTAL_ID: 'refetch',
    SAVE_BTN_PORTAL_ID: 'save',
    ActiveReportTabContext: createContext('other')
  }
})
jest.mock('@Pimcore/modules/reports/utils/reports-loader', () => ({ loadReportsMenuItems: jest.fn() }))
jest.mock('@Pimcore/modules/reports/components/refetch/refetch', () => ({ Refetch: () => null }))
jest.mock('@Pimcore/components/button/button', () => ({ Button: () => null }))
jest.mock('@Pimcore/components/portal/portal', () => ({ Portal: () => null }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/form/form-kit', () => ({ FormKit: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: { useForm: () => [{}] } }))
jest.mock('./components/general-settings/general-settings', () => ({
  GeneralSettings: () => <div data-testid="general-settings" />
}))
jest.mock('./components/permissions/permissions', () => ({
  Permissions: () => <div data-testid="permissions" />
}))
jest.mock('./components/source-definition/source-definition', () => ({ SourceDefinition: () => <div data-testid="source" /> }))
jest.mock('./components/adapter-configuration/adapter-configuration', () => ({ AdapterConfiguration: () => <div data-testid="adapter" /> }))

const order = (): string[] => screen.getAllByTestId(/^(general-settings|source|adapter|permissions)$/).map(el => el.dataset.testid ?? '')

describe('ReportConfiguration layout', () => {
  const renderConfiguration = (): void => {
    render(
      <ReportConfiguration
        modifiedReports={ [] }
        report={ { id: 'r' } as any }
        setModifiedReports={ jest.fn() }
      />
    )
  }

  it('renders General Settings, the source definition, the adapter configuration and Permissions in this order', () => {
    renderConfiguration()

    expect(order()).toEqual(['general-settings', 'source', 'adapter', 'permissions'])
  })
})
