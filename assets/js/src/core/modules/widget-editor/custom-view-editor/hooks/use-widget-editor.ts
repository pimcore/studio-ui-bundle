import { useAppDispatch } from "@Pimcore/app/store";
import trackError, { ApiError, GeneralError } from "@Pimcore/modules/app/error-handler"
import { api, WidgetConfig } from "@Pimcore/modules/perspectives/perspectives-slice.gen";
import { isUndefined } from "lodash";

interface UseWidgetEditorReturn {
  getWidgetById: (id: string, type: string) => Promise<WidgetConfig | undefined>
}

export const useWidgetEditor = (): UseWidgetEditorReturn => {
  const dispatch = useAppDispatch()

  const getWidgetById = async (widgetId: string, widgetType: string): Promise<WidgetConfig | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveWidgetGetConfigById.initiate({
        widgetId,
        widgetType
      }))

      if (!isUndefined(data) && isError == true) {
        trackError(new ApiError(error))
        return;
      }

      return data.data as unknown as WidgetConfig
    } catch (error) {
      trackError(new GeneralError('Failed to load widget data of widget "' + widgetId + '" with type "' + widgetType + '".'))
    }
  }

  return {
    getWidgetById
  }
}