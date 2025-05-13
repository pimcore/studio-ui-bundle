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
    buttonGroup: css`
      &.button-group--with-separator {
        & > .button-group__item:not(:last-child) {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 3px;
            bottom: 3px;
            width: 1px;
            background-color: ${token.Divider.colorSplit};
          }
        }
      }
    `
  }
})
