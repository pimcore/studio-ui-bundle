/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  type BundleSeoRedirect,
  type BundleSeoRedirectAdd,
  type BundleSeoRedirectUpdate,
  useBundleSeoRedirectAddMutation,
  useBundleSeoRedirectDeleteMutation,
  useBundleSeoRedirectUpdateByIdMutation
} from '../seo-api-slice-enhanced'

export type RedirectRow = BundleSeoRedirect & { rowId: string }

interface UseRedirectsReturn {
  createNewRedirect: () => Promise<{ success: boolean, data?: BundleSeoRedirect }>
  createLoading: boolean
  deleteRedirectById: (id: number) => Promise<{ success: boolean }>
  deleteLoading: boolean
  updateRedirectById: (id: number, row: RedirectRow) => Promise<{ success: boolean }>
  updateLoading: boolean
}

export const useRedirects = (): UseRedirectsReturn => {
  const [createRedirect, { isLoading: createLoading }] = useBundleSeoRedirectAddMutation()
  const [deleteRedirect, { isLoading: deleteLoading }] = useBundleSeoRedirectDeleteMutation()
  const [updateRedirect, { isLoading: updateLoading }] = useBundleSeoRedirectUpdateByIdMutation()

  const createNewRedirect = async (): Promise<{ success: boolean, data?: BundleSeoRedirect }> => {
    try {
      const defaultRedirect: BundleSeoRedirectAdd = {
        type: 'entire_uri',
        source: null,
        target: null
      }
      
      const result = await createRedirect({ bundleSeoRedirectAdd: defaultRedirect })
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

  return {
    createNewRedirect,
    createLoading,
    deleteRedirectById,
    deleteLoading,
    updateRedirectById,
    updateLoading
  }
}
