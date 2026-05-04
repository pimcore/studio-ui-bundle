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
    button: css`
              width: 100%;
              justify-content: flex-start;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: auto;

              > span {
                overflow: hidden;
                text-overflow: ellipsis;
              }
    `,
    'not-first': css`
              margin-top: ${token.marginXXS}px;
    `
  }
}, { hashPriority: 'low' })
