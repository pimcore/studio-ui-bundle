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
    form: css`
      display: flex;
      flex-direction: column;
      gap: 12px;

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        font-family: Lato, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;

        .flex-space {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ant-btn-link {
          color: ${token.colorPrimary};

          &:hover {
            color: ${token.colorPrimaryHover};
          }
        }

        .pimcore-icon {
          color: ${token.colorIcon};
        }
      }
        
    `
  }
})
