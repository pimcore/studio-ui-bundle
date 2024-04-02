import useTableStyle from 'antd/es/table/style'
import usePaginationStyle from 'antd/es/pagination/style'
import { ConfigContext } from 'antd/es/config-provider/context'
import { useContext } from 'react'

export const useCssComponentHash = (componentName: string): string => {
  const context = useContext(ConfigContext)
  const prefix = context.getPrefixCls(componentName, '')

  let hashId
  switch (componentName) {
    case 'table':
      hashId = useTableStyle(prefix)[1]
      break
    case 'pagination':
      hashId = usePaginationStyle(prefix)[1]
  }

  return hashId
}
