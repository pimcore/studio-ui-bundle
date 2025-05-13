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
    breadcrumb: css`
      .ant-dropdown-trigger {
        cursor: pointer;
        
        > span[role="img"] {
          display: none
        }
      }
    `,

    breadcrumbLink: css`
      color: ${token.colorTextTertiary};
    `,

    breadcrumbLinkLast: css`
      color: ${token.colorText};
    `,

    pathItem: css`
       cursor: pointer;
       
       &:hover {
         color: ${token.colorPrimaryHover};
       }
    `,

    dropdownMenu: css`
      max-width: 400px;
    `
  }
})
