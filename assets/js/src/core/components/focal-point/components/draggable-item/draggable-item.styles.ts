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

export const useStyle = createStyles(({ token, css }) => {
  return {
    draggableContainer: css`
        display: flex;
        position: relative;
    `,
    draggableItem: css`
      color: ${token.colorPrimary};
      width: ${token.Button.controlHeightSM}px !important;
      height: ${token.Button.controlHeightSM}px !important;
      background: ${token.Colors.Neutral.Fill.colorFill};
      box-shadow: none;
      border: 2px dashed;
      display: flex;
      justify-content: center;
      align-items: center;

        &:hover {
        color: ${token.colorPrimary};
        background: ${token.Colors.Neutral.Fill.colorFill} !important;
      }
    `
  }
})
