import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
    return {
        modal: css`
            .ant-modal-title {
                font-size: 16px;
                font-weight: 900;
                line-height: 24px;
            }
        `,
        filesList: css`
            list-style: none;
            padding: 0;
            margin: 0;
            
            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${token.Ne
            }
        `,
    }
})
