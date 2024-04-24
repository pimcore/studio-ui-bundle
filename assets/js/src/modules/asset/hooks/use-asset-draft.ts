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
