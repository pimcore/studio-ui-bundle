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
  dividerContainer: css`
    position: relative;
    min-width: 24px;
    outline: none;
  `,

  resizable: css`
    cursor: col-resize;
  `,

  divider: css`
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100%;
    overflow: hidden;
    background-color: ${token.Divider.colorSplit};
  `,

  iconContainer: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: col-resize;
  `,

  withToolbar: css`
    min-width: 1px;
    top: ${token.paddingSM}px;
    height: calc(100% - ${token.paddingSM}px);
    z-index: 1;
  `
}))
