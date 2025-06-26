import { createStyles } from "antd-style"

export const useStyles = createStyles(({ token, css }) => {
  return {
    codeEditor: css`
      height: 650px;
    `
  }
})