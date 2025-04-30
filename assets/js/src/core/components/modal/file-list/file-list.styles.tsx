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
    filesList: css`
            list-style: none;
            padding: 0;
            margin: 10px 0 0;

            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${token.colorTextTertiary}
            }
        `
  }
}, { hashPriority: 'low' })
