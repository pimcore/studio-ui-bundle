import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
    return {
        footer: css`
            .ant-btn {
                &.ant-btn-text {
                    color: ${token.colorPrimary};
                    padding: 0;
                }
            }
        `
    }
})
