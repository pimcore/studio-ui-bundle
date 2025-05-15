/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    modal: css`
        &.error {
            .ant-modal-content .ant-modal-header .ant-modal-title .pimcore-icon {
                color:  ${token.colorError}; 
            }
        }
        
        &.success {
            .ant-modal-content .ant-modal-header .ant-modal-title .pimcore-icon {
                color: ${token.colorSuccess}; 
            }
        }
        
        &.info {
            .ant-modal-content .ant-modal-header .ant-modal-title .pimcore-icon {
                color: ${token.colorPrimary}; 
            }
        }
        
        &.alert {
            .ant-modal-content .ant-modal-header .ant-modal-title .pimcore-icon {
                color: ${token.colorWarning}; 
            }
        }
        
        .ant-modal-content {
            width: 100%;
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

            .ant-modal-footer {
                width: 100%;
            }

            .ant-modal-body {
                width: 100%;
                line-height: 22px;

                & > p {
                    margin: 0;
                }
            }
        }
    `
  }
}, { hashPriority: 'low' })
