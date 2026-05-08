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

export const useStyles = createStyles(({ css, token }) => ({
  loadingRow: css`
    padding: ${token.paddingXXS}px ${token.paddingSM}px;
  `,

  dropdownFooter: css`
    padding: ${token.paddingXXS}px ${token.paddingSM}px;
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextDescription};
    border-top: 1px solid ${token.colorBorderSecondary};
    text-align: right;
  `
}))
