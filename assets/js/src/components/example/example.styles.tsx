import { type PimcoreTokens } from '@Pimcore/modules/theme/components/ThemeProvider'
import { createStyles } from 'antd-style'

export interface ExampleTokens {
  Example: {
    color: string
  }
}

declare module '@Pimcore/modules/theme/components/ThemeProvider' {
  export interface PimcoreTokens extends ExampleTokens {}
}

export const useStyle = createStyles(({ token, css }) => {
  const tokens = token as PimcoreTokens

  return {
    example: css`
      color: ${tokens.Example.color};
    `
  }
})
