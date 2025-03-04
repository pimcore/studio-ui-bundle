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
    toolbar: css`
      width: 100%;
      height: 48px;
      padding: ${token.paddingXS}px;

      &.toolbar--theme-primary {
        // @todo: use token
        background-color: #F5F3FA;
      }

      &.toolbar--theme-secondary {
        background-color: ${token.colorBgBase};
      }

      &.toolbar--position-top {
        border-bottom: 1px solid ${token.colorBorderTertiary};
      }

      &.toolbar--position-bottom {
        border-top: 1px solid ${token.colorBorderTertiary}
      }

      &.toolbar--border-default {
        border-color: ${token.colorBorderTertiary};
      }

      &.toolbar--border-primary {
        border-color: ${token.colorPrimaryBorder};
      }

      &.toolbar--size-small {
        height: 40px;
      }
    `
  }
})
