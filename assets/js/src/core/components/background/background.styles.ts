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

export const useStyle = createStyles(({ token, css }) => {
  return {
    background: css`
      position: absolute;
      inset: 0;
      background: #FFF;
      overflow: hidden; 
      opacity: 0.4;

      .background-figure {
        position: absolute;

        &--top-left {
          top: -80%;
          left: -30%;
          width: 1324px;
          height: 1324px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1324px);
          background: rgba(55, 217, 243, 0.20);
          filter: blur(310px);
        }


        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          transform: rotate(28.303deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1503.398px);
          background: #FDFFFF;
          filter: blur(310px);
        }

        &--bottom-right {
          top: 55%;
          left: 33%;
          width: 1642px;
          height: 686px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1642px);
          background: var(--pimcore-brand-background-color, rgba(122, 58, 212, 0.42));
          filter: blur(310px);
        }
      }
    `,
    logoImage: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 586px;
      max-height: 373px;
      z-index: 1;
    `
  }
}, { hashPriority: 'low' })
