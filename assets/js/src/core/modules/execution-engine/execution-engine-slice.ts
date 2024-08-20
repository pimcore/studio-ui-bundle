/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
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
