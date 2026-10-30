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
import { DefaultBatchEdit } from './default-batch-edit'
import { type BatchEdit } from './batch-edit-provider'

const mockGetComponentRenderer = jest.fn()

jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ getComponentRenderer: mockGetComponentRenderer })
}))

describe('DefaultBatchEdit', () => {
  const batchEdit = { key: 'published', type: 'system', frontendType: 'select' } as unknown as BatchEdit

  beforeEach(() => {
    mockGetComponentRenderer.mockReset()
    mockGetComponentRenderer.mockReturnValue({ ComponentRenderer: () => <span>field</span> })
  })

  it('notifies onMount when the row mounts and again when it unmounts', () => {
    const onMount = jest.fn()
    const { unmount } = render(<DefaultBatchEdit
      batchEdit={ batchEdit }
      onMount={ onMount }
                               />)

    expect(onMount).toHaveBeenCalledTimes(1)

    unmount()

    expect(onMount).toHaveBeenCalledTimes(2)
  })

  it('renders without onMount', () => {
    render(<DefaultBatchEdit batchEdit={ batchEdit } />)

    expect(screen.getByText('field')).toBeInTheDocument()
  })

  it('shows a fallback when no renderer exists for the type', () => {
    mockGetComponentRenderer.mockReturnValue({ ComponentRenderer: null })
    render(<DefaultBatchEdit batchEdit={ batchEdit } />)

    expect(screen.getByText('Dynamic Field Filter not supported')).toBeInTheDocument()
  })
})
