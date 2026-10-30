/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ css, token }) => ({
  dividerContainer: css`
    position: relative;
    min-width: 16px;
    outline: none;
    padding-top: ${token.paddingXXS}px;
    padding-bottom: ${token.paddingXXS}px;
  `,

  resizable: css`
    cursor: col-resize;
  `,

  divider: css`
    position: absolute;
    left: 50%;
    top: ${token.paddingXXS}px;
    width: 1px;
    height: calc(100% - ${token.paddingXXS * 2}px);
    overflow: hidden;
    background-color: ${token.Divider.colorSplit};
  `,

  iconContainer: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: col-resize;
  `,

  withToolbar: css`
    min-width: 1px;
    top: ${token.paddingSM}px;
    height: calc(100% - ${token.paddingSM}px);
    z-index: 1;
  `
}))
