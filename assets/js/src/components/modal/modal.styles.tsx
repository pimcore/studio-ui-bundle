import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
    return {
        modal: css`
            &.ant-modal .ant-modal-footer >.ant-btn+.ant-btn {
                margin-inline-start: 0;
            }
            
            .ant-modal-content {
                display: inline-flex;
                flex-direction: column;
                align-items: start;
                gap: ${token.marginSM}px;

                .ant-modal-header {
                    margin-bottom: 0;
                    
                    .ant-modal-title {
                        font-size: 16px;
                        font-weight: 900;
                        line-height: 24px;
                        display: flex;
                        gap: 4px;

                        svg {
                            height: 24px;
                            width: 24px;
                        }
                    }   
                }
                
                .ant-modal-body {
                    line-height: 22px;
                }
                
                .ant-modal-footer {
                    display: flex;
                    align-self: stretch;
                    
                    > .ant-modal-footer-container {
                        display: flex;
                        width: 100%;
                        gap: 8px;
                        justify-content: flex-end;
                        
                        &.space-between {
                            justify-content: space-between;
                        }
                    }
                }
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
                color: ${token.colorTextTertiary}
            }
        `,
    }
})
