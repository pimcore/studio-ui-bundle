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
    wrapper: css`
      padding: ${token.paddingXS}px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      width: 100%;
    `
  }
})
