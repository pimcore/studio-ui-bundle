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
  return {
    container: css`
      position: relative;
      margin: auto;
      user-select: none;
    `,

    imageContainer: css`
      width: 100%;
    `,

    draggableElement: css`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${token.colorPrimary};
      width: ${token.Button.controlHeightSM}px !important;
      height: ${token.Button.controlHeightSM}px !important;
      background: ${token.Colors.Neutral.Fill.colorFill};
      box-shadow: none;
      border: 2px dashed;
      transition: transform 0.05s linear !important;
      transform: translate(-50%, -50%);
      

        &:hover, &:active {
          color: ${token.colorPrimary};
          background: ${token.Colors.Neutral.Fill.colorFill} !important;
      }
    `
  }
})
