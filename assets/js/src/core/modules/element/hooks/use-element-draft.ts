/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { PropertiesDraft, UsePropertiesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-properties'
import type { SchedulesDraft, UseSchedulesDraftReturn } from '@Pimcore/modules/element/draft/hooks/use-schedules'
import type {
  TrackableChangesDraft,
  UseTrackableChangesDraftReturn
} from '@Pimcore/modules/element/draft/hooks/use-trackable-changes'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { type UseTabsDraftReturn } from '../draft/hooks/use-tabs'
import { type ElementEditorType } from '@Pimcore/modules/element/editor/services/type-registry'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'

export interface IElementDraft extends PropertiesDraft, SchedulesDraft, TrackableChangesDraft {
  id: number
  parentId: number
  fullPath?: string
  type?: string
  hasChildren?: boolean
  permissions?: ElementPermissions
  hasWorkflowAvailable?: boolean
  hasPreview?: boolean
  draftData?: {
    id: number
    modificationDate: number
    isAutoSave: boolean
  } | null
}

interface UseElementDraftReturn extends
  UsePropertiesDraftReturn,
  UseSchedulesDraftReturn,
  UseTabsDraftReturn,
  UseTrackableChangesDraftReturn {
  element: IElementDraft | undefined
  editorType: ElementEditorType | undefined
  isLoading: boolean
  isError: boolean
}

export const useElementDraft = (id: number, elementType: ElementType): UseElementDraftReturn => {
  if (elementType === 'asset') {
    const draft = useAssetDraft(id)

    return { ...draft, element: draft.asset }
  }

  if (elementType === 'data-object') {
    const draft = useDataObjectDraft(id)

    return { ...draft, element: draft.dataObject }
  }

  if (elementType === 'document') {
    const draft = useDocumentDraft(id)

    return { ...draft, element: draft.document }
  }

  trackError(new GeneralError('Element type not supported'))
  throw new Error('Element type not supported')
}
