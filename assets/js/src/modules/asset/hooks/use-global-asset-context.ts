import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { type GlobalContext, addGlobalContext, selectContextByType, removeGlobalContext } from '@Pimcore/modules/global-context/global-context-slice'

export interface GlobalAssetContext extends GlobalContext {
  type: 'asset'
  config: {
    id: number
  }
}

interface UseGlobalAssetContext {
  context: GlobalAssetContext | undefined
  setContext: (config: GlobalAssetContext['config']) => void
  removeContext: () => void
}

export const useGlobalAssetContext = (): UseGlobalAssetContext => {
  const disptach = useAppDispatch()
  const context = useAppSelector(state => selectContextByType(state, 'asset')) as GlobalAssetContext | undefined

  const setContext = function (config: GlobalAssetContext['config']): void {
    disptach(addGlobalContext({
      type: 'asset',
      config
    }))
  }

  const removeContext = function (): void {
    disptach(removeGlobalContext('asset'))
  }

  return {
    context,
    setContext,
    removeContext
  }
}
