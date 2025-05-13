/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './workflow-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL, tagNames.WORKFLOW],

  endpoints: {
    workflowGetDetails: {
      providesTags: (result, error, args) => {
        const tags = providingTags.ELEMENT_WORKFLOW(args.elementType, args.elementId)

        return tags.filter((tag) => tag !== undefined)
      }
    },
    workflowActionSubmit: {
      invalidatesTags: (result, error, args) => {
        const tags = invalidatingTags.ELEMENT_WORKFLOW(args.submitAction.elementType as ElementType, args.submitAction.elementId)

        return tags.filter((tag) => tag !== undefined)
      }
    }
  }
})

export type * from './workflow-api-slice.gen'
export const { useWorkflowActionSubmitMutation, useWorkflowGetDetailsQuery } = api
