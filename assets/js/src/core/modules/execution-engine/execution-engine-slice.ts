/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectSliceWithState, type RootState } from '@sdk/app'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { type AbstractJob } from './jobs/abstact-job'

export const jobAdapter = createEntityAdapter<AbstractJob>({})

export const slice = createSlice({
  name: 'execution-engine',
  initialState: jobAdapter.getInitialState(),
  reducers: {
    jobReceived: jobAdapter.addOne,
    jobUpdated: jobAdapter.updateOne,
    jobDeleted: jobAdapter.removeOne
  }
})

injectSliceWithState(slice)

export const { jobReceived, jobUpdated, jobDeleted } = slice.actions

export const { selectAll, selectById } = jobAdapter.getSelectors((state: RootState) => state['execution-engine'])
