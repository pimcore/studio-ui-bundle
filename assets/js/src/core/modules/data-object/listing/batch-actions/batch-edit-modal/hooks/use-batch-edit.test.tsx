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
import { act, renderHook } from '@testing-library/react'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { BatchEditProvider } from '../batch-edit-provider'
import { useBatchEdit } from './use-batch-edit'

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ contentLanguages: [] }) }))

const csColumn = (variant?: string): AvailableColumn => ({
  key: 'attributes',
  type: 'dataobject.classificationstore',
  group: ['Attributes'],
  sortable: false,
  editable: true,
  localizable: false,
  config: { keyId: 12, groupId: 3, ...(variant === undefined ? {} : { variant }) }
})

describe('useBatchEdit - classification store variant rows', () => {
  const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => <BatchEditProvider>{children}</BatchEditProvider>

  it('keeps two variants of one key as two rows, and adds a repeat of a variant once', () => {
    const { result } = renderHook(() => useBatchEdit(), { wrapper })

    act(() => { result.current.addOrUpdateBatchEdits([csColumn('Metric'), csColumn('Imperial'), csColumn()]) })
    act(() => { result.current.addOrUpdateBatchEdits([csColumn('Metric')]) })

    expect(result.current.batchEdits.map((edit) => (edit.config as any).variant)).toEqual(['Metric', 'Imperial', undefined])
  })

  it('removes only the row of the variant it is given', () => {
    const { result } = renderHook(() => useBatchEdit(), { wrapper })

    act(() => { result.current.addOrUpdateBatchEdits([csColumn('Metric'), csColumn('Imperial')]) })
    act(() => { result.current.removeBatchEdit(result.current.batchEdits[0]) })

    expect(result.current.batchEdits.map((edit) => (edit.config as any).variant)).toEqual(['Imperial'])
  })
})
