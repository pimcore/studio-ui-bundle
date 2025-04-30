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

export const useStyles = createStyles(({ token, css }) => {
  return {
    dropdown: css`
      position: absolute;
      top: 35px;
      width: 360px;
      background-color: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowSecondary};
      z-index: 1;
    `,

    tabs: css`
      .ant-tabs-nav-list {
        justify-content: space-around;
        width: 100%;
      }
      
      .ant-tabs-ink-bar {
        width: 50% !important;
      }
      
      .ant-tabs-content-holder {
        padding: ${token.paddingXS}px;
      }
    `,

    btnGroupWrapper: css`
      display: flex;
      justify-content: flex-end;
      padding: 7px ${token.paddingXS}px;
    `
  }
})
