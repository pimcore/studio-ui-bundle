/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const useClassificationStoreColumnLabelMock = jest.fn()

jest.mock('./use-classification-store-column-label', () => ({
  useClassificationStoreColumnLabel: (...args: unknown[]) => useClassificationStoreColumnLabelMock(...args)
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { label?: string }) => `${key}|${options?.label ?? ''}`
  })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ClassificationStoreColumnLabel } from './classification-store-column-label'

describe('ClassificationStoreColumnLabel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the resolved label as plain text', () => {
    useClassificationStoreColumnLabelMock.mockReturnValue({
      label: 'Dimensions › Height',
      isLoading: false,
      isMissing: false
    })

    render(<ClassificationStoreColumnLabel
      classId='AP'
      column={ { key: 'technicalAttributes', type: 'dataobject.classificationstore' } }
           />)

    expect(screen.getByText('Dimensions › Height')).toBeInTheDocument()
  })

  it('styles a missing key/group relation as a warning, not a plain label', () => {
    useClassificationStoreColumnLabelMock.mockReturnValue({
      label: '#1.2',
      isLoading: false,
      isMissing: true
    })

    render(<ClassificationStoreColumnLabel
      classId='AP'
      column={ { key: 'technicalAttributes', type: 'dataobject.classificationstore' } }
           />)

    expect(screen.getByText('column-editor.classification-store.missing|#1.2')).toBeInTheDocument()
  })
})
