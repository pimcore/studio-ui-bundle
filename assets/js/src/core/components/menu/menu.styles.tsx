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
  const submenuStyles = css`
    .ant-dropdown-menu-submenu-title {
      padding-inline-end: ${token.paddingXL}px !important;
    }

    .ant-dropdown-menu-submenu-expand-icon {
      inset-inline-end: ${token.paddingXS}px !important;
      position: absolute !important;
      margin-top: 2px;
    }
  `

  return {
    menu: submenuStyles,
    submenuPopup: submenuStyles
  }
})
