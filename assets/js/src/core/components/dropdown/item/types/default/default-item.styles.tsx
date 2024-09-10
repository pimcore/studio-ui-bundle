/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    dropdownItem: css`
      &.ant-dropdown-menu-item-active {
        background-color: ${token.colorBgContainer} !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
      }

      &.default-item--with-icon-right {
        padding-right: 4px !important;
      }
    `
  }
})
