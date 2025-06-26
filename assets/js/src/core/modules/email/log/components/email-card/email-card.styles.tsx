import { createStyles } from "antd-style"

export const useStyles = createStyles(({ token, css }) => {
  return {
    errorIcon: css`
      color: ${token.colorError};
    `
  }
})