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
