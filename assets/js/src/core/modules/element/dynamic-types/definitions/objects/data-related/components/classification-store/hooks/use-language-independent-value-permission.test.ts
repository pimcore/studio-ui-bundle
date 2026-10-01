/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: jest.fn()
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
// eslint-disable-next-line import/first
import { useLanguageIndependentValuePermission } from './use-language-independent-value-permission'

const mockUseDataObjectDraft = useDataObjectDraft as jest.MockedFunction<any>

// The shape the permission has to be read from: the draft hook returns the data object under
// `dataObject`, and the workspace language permission is a comma separated string on it.
const givenLocalizedViewPermission = (localizedView: string | null | undefined): void => {
  mockUseDataObjectDraft.mockReturnValue(
    localizedView === undefined
      ? { dataObject: undefined }
      : { dataObject: { id: 42, permissions: { localizedView } } }
  )
}

describe('useLanguageIndependentValuePermission', () => {
  it('allows the language independent value while the data object is not loaded yet', () => {
    givenLocalizedViewPermission(undefined)

    expect(renderHook(useLanguageIndependentValuePermission).result.current).toBe(true)
  })

  it('allows the language independent value when no language permission is configured', () => {
    givenLocalizedViewPermission(null)

    expect(renderHook(useLanguageIndependentValuePermission).result.current).toBe(true)
  })

  it('allows the language independent value when the language list contains it', () => {
    givenLocalizedViewPermission('default,de')

    expect(renderHook(useLanguageIndependentValuePermission).result.current).toBe(true)
  })

  it('denies the language independent value when the language list leaves it out', () => {
    givenLocalizedViewPermission('de,en')

    expect(renderHook(useLanguageIndependentValuePermission).result.current).toBe(false)
  })
})
