import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    filesList: css`
            list-style: none;
            padding: 0;
            margin: 10px 0 0;

            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${token.colorTextTertiary}
            }
        `
  }
})
