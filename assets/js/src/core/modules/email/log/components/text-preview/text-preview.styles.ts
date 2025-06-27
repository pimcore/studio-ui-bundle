import { createStyles } from "antd-style"

export const useStyles = createStyles(({ token, css }) => {
  return {
    codeEditor: css`
      max-height: 650px;
    `
  }
})