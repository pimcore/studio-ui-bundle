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
    checkbox: css`
      &.versionFieldItem {
        padding: ${token.paddingXXS}px;
        background-color: ${token.colorBgContainerDisabled} !important;
        border: 1px solid transparent;
      }

      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        border-color: ${token.colorBorder} !important;
      }
    `
  }
})
