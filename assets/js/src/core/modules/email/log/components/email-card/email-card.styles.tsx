import { createStyles } from "antd-style"

export const useStyles = createStyles(({ token, css }) => {
  return {
    errorIcon: css`
      color: ${token.colorError};
    `,
    divider: css`
      border-color: ${token.colorTextSecondary};
      margin-left: 2px;
      margin-right: 2px;
    `
  }
})