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
        &.ant-modal .ant-modal-footer > .ant-btn + .ant-btn {
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
