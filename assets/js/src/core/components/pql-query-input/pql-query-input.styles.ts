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
    tooltip: css`
      width: 394px;
      max-width: 100%;
    `,

    infoIcon: css`
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
    `,

    text: css`
      color: ${token.colorTextLightSolid};
      line-height: 22px;
    }
    `,

    link: css`
      color: #d3adf7 !important;
      text-decoration: underline !important;
    `
  }
})
