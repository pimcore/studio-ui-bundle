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
import { NewTranslationModal } from './new-translation-modal'
import type { Element } from '@Pimcore/modules/element/element-helper'

const mockTranslationsResult: { data?: unknown, isFetching: boolean, error?: unknown } = {
  isFetching: false
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({
  useSettings: () => ({ validLanguages: ['en', 'de', 'fr'] })
}))

jest.mock('@Pimcore/modules/translations/hooks/use-language-lookup', () => ({
  useLanguageLookup: () => ({ getDisplayName: (locale: string) => `name-${locale}` })
}))

jest.mock('@Pimcore/modules/document/document-api-slice-enhanced', () => ({
  useLazyDocumentGetTranslationsQuery: () => [jest.fn(), mockTranslationsResult],
  useDocumentGetTranslationParentByLanguageQuery: () => ({ isLoading: false, isFetching: false })
}))

jest.mock('@Pimcore/components/modal/window-modal/window-modal', () => ({
  WindowModal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/modal/footer/modal-footer', () => ({
  ModalFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: () => <div>loading</div>
}))

jest.mock('@Pimcore/components/many-to-one-relation/many-to-one-relation', () => ({
  ManyToOneRelation: () => null
}))

jest.mock('@Pimcore/components/input/input', () => ({
  Input: () => null
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options }: { options: Array<{ value: string, label: string }> }) => (
    <ul>
      {options.map(option => <li key={ option.value }>{option.label}</li>)}
    </ul>
  )
}))

jest.mock('@sdk/components', () => {
  const FormMock = ({ children }: { children: React.ReactNode }): React.JSX.Element => <form>{children}</form>
  FormMock.useForm = () => [{ setFieldValue: jest.fn(), setFieldsValue: jest.fn(), validateFields: jest.fn() }]
  FormMock.Item = function FormItemMock ({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <div>{children}</div>
  }
  return { Form: FormMock }
})

jest.mock('./translation-error-alert', () => ({
  TranslationErrorAlert: () => <div>error</div>
}))

const currentDocument = {
  id: 1,
  properties: [{ key: 'language', data: 'en' }]
} as unknown as Element

const renderModal = (): void => {
  render(
    <NewTranslationModal
      currentDocument={ currentDocument }
      isOpen
      onClose={ jest.fn() }
      onSubmit={ jest.fn() }
      useInheritance={ false }
    />
  )
}

describe('NewTranslationModal', () => {
  beforeEach(() => {
    mockTranslationsResult.data = undefined
    mockTranslationsResult.isFetching = false
    mockTranslationsResult.error = undefined
  })

  it('offers only languages that are neither the own language nor already linked', () => {
    mockTranslationsResult.data = {
      language: 'en',
      translationLinks: [{ language: 'de', id: 2 }]
    }

    renderModal()

    expect(screen.getByText('name-fr [fr]')).toBeInTheDocument()
    expect(screen.queryByText('name-en [en]')).not.toBeInTheDocument()
    expect(screen.queryByText('name-de [de]')).not.toBeInTheDocument()
  })
})
