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

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { useGetAssetByIdQuery } from '../asset-api-slice.gen'
import { assetReceived, selectAssetById } from '../asset-draft-slice'
import { useEffect } from 'react'

interface UseAssetDraftReturn {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>
}

export const useAssetDraft = (id: number): UseAssetDraftReturn => {
  const { isLoading, isError, data } = useGetAssetByIdQuery({ id })
  const dispatch = useAppDispatch()
  const asset = useAppSelector(state => selectAssetById(state, id))

  useEffect(() => {
    if (data !== undefined) {
      dispatch(assetReceived({ id, ...data }))
    }
  }, [data])

  return { isLoading, isError, asset }
}
