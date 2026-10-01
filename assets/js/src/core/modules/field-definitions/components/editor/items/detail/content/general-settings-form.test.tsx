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
import { GeneralSettingsProvider } from '../general-settings-provider'
import { GeneralSettingsForm } from './general-settings-form'

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({ GeneralSettingsFormFields: () => null })
}))

// defaultValue is read on mount only, like antd's initialValues
jest.mock('@sdk/components', () => ({
  Content: ({ children }: any) => <div>{children}</div>,
  FormKit: ({ formProps }: any) => (
    <input
      data-testid="title"
      defaultValue={ formProps.initialValues.title }
    />
  )
}))

jest.mock('@sdk/utils', () => ({
  useDebounce: (value: unknown) => value
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const tree = (title: string): React.JSX.Element => (
  <GeneralSettingsProvider generalSettings={ { title } }>
    <GeneralSettingsForm />
  </GeneralSettingsProvider>
)

describe('GeneralSettingsForm', () => {
  it('shows new server data without being unmounted', () => {
    const { rerender } = render(tree('old'))

    rerender(tree('imported'))

    expect(screen.getByTestId('title')).toHaveValue('imported')
  })
})
