/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api as userApi } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { isUndefined } from 'lodash'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { userClosed } from '@Pimcore/modules/user/user-management-slice'

export interface UserDeleteJobOptions {
  id: number
}

export class UserDeleteJob implements JobInterface {
  private readonly id: number

  constructor(options: UserDeleteJobOptions) {
    this.id = options.id
  }

  async run(options: JobRunOptions): Promise<void> {
    try {
      await this.executeDeleteRequest()
      await this.handleCompletion()
    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    }
  }

  private async executeDeleteRequest(): Promise<null> {
    const response = await store.dispatch(
      userApi.endpoints.userDeleteById.initiate({
        id: this.id
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
    }

    return null
  }

  private async handleCompletion(): Promise<void> {
    store.dispatch(
      userApi.util.invalidateTags(
        invalidatingTags.USERS()
      )
    )

    store.dispatch(
      userApi.util.invalidateTags(
        invalidatingTags.USER_TREE()
      )
    )

    //clear caches -> close user tab
    store.dispatch(userClosed({
      id: this.id,
      allIds: store.getState().user.ids
    }))
  }

  private async handleJobFailure(error: any): Promise<void> {
    console.error('User Delete job failed:', error)
  }
}
