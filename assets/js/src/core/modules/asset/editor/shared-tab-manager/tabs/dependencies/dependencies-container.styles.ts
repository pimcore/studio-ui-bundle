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
    tab: css`
      display: flex;
      padding-left: ${token.paddingXS}px;
      padding-right: ${token.paddingXS}px;
      height: 100%;
        
      .pimcore-dependencies__requires,
      .pimcore-dependencies__required-by {
        flex-grow: 1;
      }
        
      > .ant-divider {
        height: 100%
      }
    `,
    toolbar: css`
      display: flex;
      padding: ${token.paddingSM}px ${token.paddingXS}px  ${token.paddingSM}px ${token.paddingSM}px;
      align-items: center;
      color: ${token.colorPrimary};
      gap: 4px;
        
      &:hover {
        color: ${token.colorPrimaryHover};
      }
        
      > p {
        margin: 0;
      }
    `
  }
})
