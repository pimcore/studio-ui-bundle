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
    wrapper: css`
      position: relative;
      display: inline-block;
    `,

    editButton: css`
      position: absolute;
      top: ${token.paddingXS}px;
      right: ${token.paddingXS}px;
      z-index: 10;
    `
  }
})
