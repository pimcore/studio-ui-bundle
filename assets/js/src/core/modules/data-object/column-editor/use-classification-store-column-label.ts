/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { isNil } from 'lodash'
import { skipToken } from '@reduxjs/toolkit/query'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  useClassificationStoreGetKeyGroupRelationsQuery,
  useClassificationStoreGetLayoutByKeyQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import {
  CLASSIFICATION_STORE_COLUMN_TYPE,
  getClassificationStoreColumnLabel,
  type ColumnIdentityInput
} from './types'

export interface ClassificationStoreColumnLabelState {
  /** The best available "Group › Key" label - live-resolved once the lookups below settle. */
  label: string
  /** True while the live title is still being resolved (`label` is a placeholder meanwhile). */
  isLoading: boolean
  /** True once the group/key relation genuinely no longer exists (a 404, not any other error). */
  isMissing: boolean
}

const KEY_GROUP_RELATIONS_PAGE_SIZE = 500

const isNotFoundError = (error: unknown): boolean => (error as { status?: number } | undefined)?.status === 404

/**
 * Live "Group › Key" label for a classification store column, resolved from the classification
 * store API rather than a column's own persisted `config` snapshot - which goes stale the moment a
 * key or group is renamed, and which BPT's Output Channels no longer even writes (see
 * `stripClassificationStoreSnapshot`).
 *
 * Deliberately uses only the same `objects`-permission-level endpoints the group/key picker itself
 * already calls (`GetKeyGroupRelationsController`/`GetLayoutByKeyController`), not the
 * classification-store *configuration* (admin) endpoints - so this resolves for the same users who
 * can already open the picker, not only classification-store administrators.
 *
 * Two lookups, each shared/deduplicated across every column instance requesting the same
 * store/group/key by RTK Query's own cache - identical arguments collapse into one request, so
 * several columns picked from the same container field, or referencing the same key, never
 * multiply requests:
 * - `key-group-relations` (one request per store + container field, gives the group's display name)
 * - `layout-by-key` (one request per distinct group/key pair, gives the key's title - no bulk,
 *   admin-permission-free endpoint returns titles for a whole store/group in one call; see the
 *   Output Channels "Follow-up 2026-09-26" note for why)
 *
 * Falls back to the column's own config snapshot (or the bare key id, via
 * {@see getClassificationStoreColumnLabel}) while resolving, and reports `isMissing: true` - never
 * a silent guess - only once the key/group relation genuinely 404s.
 */
export const useClassificationStoreColumnLabel = (
  column: ColumnIdentityInput,
  classId: string | undefined
): ClassificationStoreColumnLabelState => {
  const groupId = column.config?.groupId as number | undefined
  const keyId = column.config?.keyId as number | undefined
  const canResolve = column.type === CLASSIFICATION_STORE_COLUMN_TYPE &&
    typeof groupId === 'number' &&
    typeof keyId === 'number' &&
    !isNil(classId) &&
    classId !== ''

  const snapshotLabel = getClassificationStoreColumnLabel(column)

  const { data: availableColumnsData } = dataObjectApi.endpoints.dataObjectGetAvailableGridColumns.useQuery(
    canResolve ? { classId, folderId: 1 } : skipToken
  )

  const storeId = useMemo((): number | undefined => {
    const match = availableColumnsData?.columns?.find(
      (candidate) => candidate.key === column.key && candidate.type === CLASSIFICATION_STORE_COLUMN_TYPE
    )
    const config = match?.config as { fieldDefinition?: { storeId?: number } } | undefined

    return config?.fieldDefinition?.storeId
  }, [availableColumnsData, column.key])

  const { data: relationsData } = useClassificationStoreGetKeyGroupRelationsQuery(
    canResolve && storeId !== undefined
      ? {
          storeId,
          classId,
          fieldName: column.key,
          page: 1,
          pageSize: KEY_GROUP_RELATIONS_PAGE_SIZE
        }
      : skipToken
  )

  const groupName = relationsData?.items.find((item) => item.groupId === groupId)?.groupName

  const { data: layoutData, isFetching: isLayoutFetching, error: layoutError } =
    useClassificationStoreGetLayoutByKeyQuery(
      canResolve ? { groupId, keyId, fieldName: column.key } : skipToken
    )

  if (!canResolve) {
    return { label: snapshotLabel, isLoading: false, isMissing: false }
  }

  if (isNotFoundError(layoutError)) {
    return { label: `#${String(groupId)}.${String(keyId)}`, isLoading: false, isMissing: true }
  }

  const definition = layoutData?.definition as { title?: string } | undefined
  const keyTitle = definition?.title ?? layoutData?.name

  if (isNil(keyTitle)) {
    return { label: snapshotLabel, isLoading: isLayoutFetching, isMissing: false }
  }

  const label = isNil(groupName) || groupName === '' ? keyTitle : `${groupName} › ${keyTitle}`

  return { label, isLoading: false, isMissing: false }
}
