/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  type BundleSeoRedirect,
  type BundleSeoRedirectAdd,
  type BundleSeoRedirectUpdate,
  useBundleSeoRedirectAddMutation,
  useBundleSeoRedirectDeleteMutation,
  useBundleSeoRedirectUpdateByIdMutation,
  useBundleSeoRedirectCleanupMutation
} from '../seo-api-slice-enhanced'
import { isUndefined } from 'lodash'

export type RedirectRow = BundleSeoRedirect & { rowId: string }

interface UseRedirectsReturn {
  createNewRedirect: (redirectData?: Partial<BundleSeoRedirectAdd>) => Promise<{ success: boolean, data?: BundleSeoRedirect }>
  createLoading: boolean
  deleteRedirectById: (id: number) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateRedirectById: (id: number, row: RedirectRow) => Promise<{ success: boolean }>
  updateLoading: boolean
  cleanupRedirects: () => Promise<{ success: boolean }>
  cleanupLoading: boolean
}

export const useRedirects = (): UseRedirectsReturn => {
  const [createRedirect, { isLoading: createLoading }] = useBundleSeoRedirectAddMutation()
  const [deleteRedirect, { isLoading: deleteLoading }] = useBundleSeoRedirectDeleteMutation()
  const [updateRedirect, { isLoading: updateLoading }] = useBundleSeoRedirectUpdateByIdMutation()
  const [cleanupRedirectsMutation, { isLoading: cleanupLoading }] = useBundleSeoRedirectCleanupMutation()

  const createNewRedirect = async (redirectData?: Partial<BundleSeoRedirectAdd>): Promise<{ success: boolean, data?: BundleSeoRedirect }> => {
    try {
      const defaultRedirect: BundleSeoRedirectAdd = {
        type: redirectData?.type ?? 'entire_uri',
        source: redirectData?.source ?? null,
        target: redirectData?.target ?? null
      }

      const result = await createRedirect({ bundleSeoRedirectAdd: defaultRedirect })

      if (!isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }

      if ('data' in result) {
        return { success: true, data: result.data }
      }
    } catch {
      trackError(new GeneralError('Was not able to create Redirect'))
    }
    return { success: false }
  }

  const deleteRedirectById = async (id: number): Promise<{ success: boolean }> => {
    try {
      const result = await deleteRedirect({ id })
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to delete Redirect'))
      return { success: false }
    }
  }

  const toApiRedirect = (row: RedirectRow): BundleSeoRedirectUpdate => ({
    type: row.type ?? '',
    sourceSite: row.sourceSite,
    source: row.source,
    targetSite: row.targetSite,
    target: row.target,
    statusCode: row.statusCode ?? 301,
    priority: row.priority ?? 1,
    regex: row.regex ?? false,
    active: row.active ?? true,
    passThroughParameters: row.passThroughParameters ?? false,
    expiry: row.expiry
  })

  const updateRedirectById = async (id: number, row: RedirectRow): Promise<{ success: boolean }> => {
    try {
      const result = await updateRedirect({ id, bundleSeoRedirectUpdate: toApiRedirect(row) })
      return { success: 'data' in result }
    } catch {
      trackError(new GeneralError('Was not able to update Redirect'))
      return { success: false }
    }
  }

  const cleanupRedirects = async (): Promise<{ success: boolean }> => {
    try {
      await cleanupRedirectsMutation()
      return { success: true }
    } catch {
      trackError(new GeneralError('Was not able to cleanup redirects'))
      return { success: false }
    }
  }

  return {
    createNewRedirect,
    createLoading,
    deleteRedirectById,
    deleteLoading,
    updateRedirectById,
    updateLoading,
    cleanupRedirects,
    cleanupLoading
  }
}
