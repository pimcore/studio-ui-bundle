/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    modal: css`
            &.ant-modal .ant-modal-footer >.ant-btn+.ant-btn {
                margin-inline-start: 0;
                margin-left: 10px;
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
                    }   
                }
                
                .ant-modal-body {
                    line-height: 22px;
                    
                    & > p {
                        margin: 0;
                    }
                }
                
                .ant-modal-footer {
                    display: flex;
                    align-self: stretch;
                    margin-top: 0;
                    
                    > .ant-modal-footer-container {
                        display: flex;
                        width: 100%;
                        gap: 8px;
                        justify-content: flex-end;
                        
                        &.space-between {
                            justify-content: space-between;
                        }

                        .ant-btn-link {
                            color: ${token.colorPrimary};
                            margin: 0;
                            padding: 0;
                            
                            &:hover {
                                color: ${token.colorPrimaryHover};
                            }
                        }
                    }
                }
            }
        `
  }
}, { hashPriority: 'low' })
