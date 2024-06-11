import { createStyles } from "antd-style"

export const useStyle = createStyles(({token, css}) => {
  return {
    content: css`
      border: 1px solid transparent;
      padding: 5px;
    `,
  }
})
