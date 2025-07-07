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
  isActuallyLoading?: boolean
}

export const useStyle = createStyles(({ css, token }, props: StylesProps & { useExternalReadyState?: boolean }) => {
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
      display: ${props.useExternalReadyState === true
        ? (props.isLoaded && props.isActuallyLoading !== true ? 'block' : 'none')
        : (props.isLoaded ? 'block' : 'none')};
      pointer-events: ${props.isReloading || (props.useExternalReadyState === true && !props.isLoaded) ? 'none' : 'auto'};
    `,

    loadingOverlay: css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(1px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      pointer-events: all;
    `
  }
})
