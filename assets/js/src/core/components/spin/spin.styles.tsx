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
    spin: css`
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes spin-dot {
        0% {
          opacity: 0.3;
        } 
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }

      animation-name: spin;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      circle {
        animation: spin-dot 2s infinite;

        &:nth-child(1) {
          animation-delay: 0.5s;
        }

        &:nth-child(2) {
          animation-delay: 1.5s;
        }

        &:nth-child(3) {
          animation-delay: 1s;
        }

        
        &:nth-child(4) {
          animation-delay: 2s;
        }
      }
    `,

    spinContainer: css`
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100px;
      color: ${token.colorPrimary};
    `
  }
})
