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
    footer: css`
        &.--divider {
            padding-top: 10px;
            border-top: 1px solid ${token.Divider.colorSplit}
        }
        
            .ant-btn-link {
                color: ${token.colorPrimary};
                margin: 0;
                padding: 0;

                &:hover {
                    color: ${token.colorPrimaryHover};
                }
            }
        `
  }
}, { hashPriority: 'low' })
