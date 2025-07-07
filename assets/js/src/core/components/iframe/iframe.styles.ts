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

interface StylesProps {
  isLoaded: boolean
  isReloading: boolean
}

export const useStyle = createStyles(({ css, token }, props: StylesProps) => {
  return {
    iframeContainer: css`
      width: 100%;
      height: 100%;
      position: relative;
    `,

    iframe: css`
      width: 100%;
      height: 100%;
      border: none;
      display: ${props.isLoaded ? 'block' : 'none'};
      pointer-events: ${props.isReloading ? 'none' : 'auto'};
    `,

    loadingOverlay: css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${props.isReloading ? 'rgba(255, 255, 255, 0.7)' : 'transparent'};
      backdrop-filter: ${props.isReloading ? 'blur(2px)' : 'none'};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      pointer-events: all;
    `
  }
})
