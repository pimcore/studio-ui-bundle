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
      height: 100%;
        
      .pimcore-dependencies__requires,
      .pimcore-dependencies__required-by {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
        
      > .ant-divider {
        margin: 0;
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
    `,
    wrapper: css`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding-left: ${token.paddingXS}px;
      padding-right: ${token.paddingXS}px;
    `,
    pagination: css`
      height: 48px;
      display: flex;
      padding-left: ${token.paddingXS}px;
      padding-right: ${token.paddingXS}px;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
        
      &:has(*) {
        border-top: 1px solid ${token.colorBorderTertiary};
      }
    `
  }
})
