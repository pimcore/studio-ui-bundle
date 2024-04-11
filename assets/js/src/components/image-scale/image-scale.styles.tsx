import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    imageScale: css`
            .ant-radio-button-wrapper {
                & > span:not(.ant-radio-button) {
                    line-height: 34px;
                }
            }
        `
  }
})
