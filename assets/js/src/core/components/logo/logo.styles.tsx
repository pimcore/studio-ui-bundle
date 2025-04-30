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

export const useStlyes = createStyles(({ token, css }) => {
  return {
    logo: css`
      padding: 13px 16px 0 16px;
    `
  }
}, { hashPriority: 'low' })
