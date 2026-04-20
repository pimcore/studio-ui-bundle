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

      @keyframes pimcore-bubble-orbit-tl {
        0%   { transform: translate(0,     0)    rotate(65.637deg); }
        25%  { transform: translate(40px, -30px) rotate(75deg); }
        50%  { transform: translate(20px,  50px) rotate(65.637deg); }
        75%  { transform: translate(-30px, 20px) rotate(55deg); }
        100% { transform: translate(0,     0)    rotate(65.637deg); }
      }

      @keyframes pimcore-bubble-orbit-bl {
        0%   { transform: translate(0,     0)    rotate(28.303deg); }
        33%  { transform: translate(-40px, 30px) rotate(38deg); }
        66%  { transform: translate(30px, -40px) rotate(18deg); }
        100% { transform: translate(0,     0)    rotate(28.303deg); }
      }

      @keyframes pimcore-bubble-orbit-br {
        0%   { transform: translate(0,     0)    rotate(65.637deg); }
        25%  { transform: translate(-30px, 40px) rotate(55deg); }
        50%  { transform: translate(40px,  20px) rotate(75deg); }
        75%  { transform: translate(10px, -30px) rotate(65.637deg); }
        100% { transform: translate(0,     0)    rotate(65.637deg); }
      }

      @keyframes pimcore-bubble-hue {
        0%   { filter: blur(310px) hue-rotate(0deg); }
        100% { filter: blur(310px) hue-rotate(360deg); }
      }

      .background-figure {
        position: absolute;

        &--top-left {
          top: -80%;
          left: -30%;
          width: 1324px;
          height: 1324px;
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1324px);
          background: rgba(55, 217, 243, 0.20);
          filter: blur(310px);
          animation:
            pimcore-bubble-orbit-tl 12s ease-in-out infinite,
            pimcore-bubble-hue 16s linear infinite;
        }

        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1503.398px);
          background: #FDFFFF;
          filter: blur(310px);
          animation:
            pimcore-bubble-orbit-bl 10s ease-in-out infinite,
            pimcore-bubble-hue 20s linear infinite 2s;
        }

        &--bottom-right {
          top: 55%;
          left: 33%;
          width: 1642px;
          height: 686px;
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1642px);
          background: var(--pimcore-brand-background-color, rgba(122, 58, 212, 0.42));
          filter: blur(310px);
          animation:
            pimcore-bubble-orbit-br 14s ease-in-out infinite 1s,
            pimcore-bubble-hue 18s linear infinite 4s;
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
