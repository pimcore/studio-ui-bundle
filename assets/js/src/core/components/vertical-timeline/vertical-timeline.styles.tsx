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
    timeline: css`
      padding-left: ${token.paddingXS}px;
    
      & > div {
        position: relative;
        margin: 0;
        
        padding: 3px 0 7px 21px;
        
        border-left: 2px solid rgba(0,0,0,6%);
      }

      & > div:before {
        content: '';
        
        position: absolute;
        margin-top: 16px;
        margin-right: -4px;
        right: 100%;
        text-align: center;

        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid ${token.colorTextDisabled};
      }

      & > .is-active:before {
        height: 10px;
        width: 10px;
        margin-right: -6px;
        border-color: ${token.colorPrimary};
      }

      & > .is-published:before {
        border-color: ${token.colorSuccess};
    `
  }
}, { hashPriority: 'low' })
