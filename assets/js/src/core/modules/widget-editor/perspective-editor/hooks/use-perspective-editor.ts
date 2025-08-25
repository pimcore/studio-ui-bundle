import { useAppDispatch } from "@Pimcore/app/store"
import trackError, { ApiError, GeneralError } from "@Pimcore/modules/app/error-handler"
import { api, PerspectiveConfigDetail } from "@Pimcore/modules/perspectives/perspectives-slice.gen"
import { isUndefined } from "lodash"

interface UsePerspectiveEditorReturn {
  getPerspectiveById: (id: string) => Promise<PerspectiveConfigDetail | undefined>
}

export const usePerspectiveEditor = (): UsePerspectiveEditorReturn => {
  const dispatch = useAppDispatch()

  const getPerspectiveById = async (id: string): Promise<PerspectiveConfigDetail | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveGetConfigById.initiate({ perspectiveId: id }))

      if (!isUndefined(data) && isError == true) {
        trackError(new ApiError(error))
        return;
      }

      return data as PerspectiveConfigDetail
    } catch (error) {
      trackError(new GeneralError('Failed to load perspective data of perspective "' + id + '".'))
    }
  }

  return {
    getPerspectiveById
  };
}