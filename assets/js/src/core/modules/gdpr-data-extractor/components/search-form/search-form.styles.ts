import { createStyles } from "antd-style"

export const useStyle = createStyles(({ token, css }) => {
  return {
    form: css`
      label {
        min-width: 90px;
      }

      .ant-input  {
        width: 400px
      }
    `
  }
})