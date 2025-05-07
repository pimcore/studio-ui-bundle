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

export const useStyles = createStyles(({ css, token }) => {
  return {
    button: css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 16px;
      height: 16px;

      &:hover {
        cursor: pointer; 
      }

      .sort-button__arrow {
        color: ${token.colorTextDisabled};
      }

      .sort-button__asc {
        margin-bottom: -4px;
      }

      &.sort-button--sorting-asc {
        .sort-button__asc {
          color: ${token.colorPrimary};
        }
      }

      &.sort-button--sorting-desc {
        .sort-button__desc {
          color: ${token.colorPrimary};
        }
      }
    `
  }
}, { hashPriority: 'low' })
