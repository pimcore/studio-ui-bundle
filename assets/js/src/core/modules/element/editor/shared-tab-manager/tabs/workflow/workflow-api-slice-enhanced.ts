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

import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './workflow-api-slice.gen'
import { type ElementType } from 'types/element-type.d'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL, tagNames.WORKFLOW],

  endpoints: {
    workflowGetDetails: {
      providesTags: (result, error, args) => providingTags.ELEMENT_WORKFLOW(args.elementType, args.elementId)
    },
    workflowActionSubmit: {
      invalidatesTags: (result, error, args) => providingTags.ELEMENT_WORKFLOW(args.submitAction.elementType as ElementType, args.submitAction.elementId)
    }
  }
})

export type * from './workflow-api-slice.gen'
export const { useWorkflowActionSubmitMutation, useWorkflowGetDetailsQuery } = api
