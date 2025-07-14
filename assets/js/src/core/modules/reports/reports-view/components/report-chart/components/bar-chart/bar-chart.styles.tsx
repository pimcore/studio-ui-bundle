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
    tooltipTitle: css`
      color: rgba(0, 0, 0, 0.5);
    `,

    tooltipItemValue: css`
      color: #000000;
    `,

    circle: css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
    `
  }
})
