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
