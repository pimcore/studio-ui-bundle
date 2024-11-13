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
