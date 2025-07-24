import { createStyles } from "antd-style"

export const useStyles = createStyles(({ css, token }) => {
  return {
    dynamicGroupItem: css`
      background-color: ${token.colorFillAdditional};
      border-radius: ${token.borderRadius}px;
    `
  }
})
