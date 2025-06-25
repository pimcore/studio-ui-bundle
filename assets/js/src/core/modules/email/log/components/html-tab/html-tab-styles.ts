import { createStyles } from "antd-style"

export const useStyles = createStyles(({ token, css }) => {
  return {
    iframe: css`
      height: 650px;
      border: none;
    `
  }
})