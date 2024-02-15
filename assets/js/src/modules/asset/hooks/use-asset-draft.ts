import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { useApiAssetsIdGetQuery } from '../api/asset.gen'
import { assetReceived, selectAssetById } from '../store/asset-draft-slice'
import { useEffect } from 'react'

interface UseAssetDraftReturn {
  isLoading: boolean
  isError: boolean
  asset: undefined | ReturnType<typeof selectAssetById>
}

export const useAssetDraft = (id: string): UseAssetDraftReturn => {
  const { isLoading, isError, data } = useApiAssetsIdGetQuery({ id })
  const dispatch = useAppDispatch()
  const asset = useAppSelector(state => selectAssetById(state, id))

  useEffect(() => {
    if (data !== undefined) {
      dispatch(assetReceived({ id, ...data }))
    }
  }, [data])

  return { isLoading, isError, asset }
}
