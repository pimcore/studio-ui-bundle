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

export const useStyles = createStyles(({
  token,
  css
}) => {
  return {
    leftSidebar: css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;

      .left-sidebar__avatar {
        margin: 8px 15px 0 15px;
        pointer-events: auto;
        cursor: pointer;
      }

      .ant-avatar {
        background-color: rgba(114, 46, 209, 0.66);

        .anticon {
          vertical-align: 0;
        }
      }
      
      .left-sidebar__nav {
        list-style: none;
        padding: ${token.paddingXXS}px 0;
        margin: ${token.marginSM}px 0;
        position: relative;
        pointer-events: auto;
        text-align: center;
        
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: ${token.paddingSM}px;
          right: ${token.paddingSM}px;
          height: 1px;
          background: ${token.Divider.colorSplit};
        }
      }
    `
  }
}, { hashPriority: 'low' })
