/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles, keyframes } from 'antd-style'
import { type LoadPhase } from '@Pimcore/modules/app/app-loader/app-loader'

interface StyleProps {
  phase: LoadPhase
  backgroundShade: string
}

// ---------------------------------------------------------------------------
// App intro — fade + subtle scale-up for the main UI when loading completes.
// Starts after a short delay so the background opacity transition has already
// begun, creating a depth-aware crossfade handoff.
// ---------------------------------------------------------------------------

export const appIntro = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// The React Background component is always hidden behind the Twig preloader
// (z-index: 9999) during the loading phase, so it only ever needs to describe
// the idle state. All orbit animation logic lives exclusively in the Twig
// preloader template, which owns the loading animation entirely.
export const useStyle = createStyles(({ css }, { backgroundShade }: StyleProps) => {
  const resolvedBackgroundShade = backgroundShade !== '' ? backgroundShade : '#722ed1'

  return {
    background: css`
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: #FFF;
      overflow: hidden;
      opacity: 0.3;

      .background-figure {
        position: absolute;
        filter: blur(80px);

        &--top-left {
          width: 1324px;
          height: 1324px;
          flex-shrink: 0;
          border-radius: 1324px;
          background: rgba(55, 217, 243, 0.20);
          top: -80%;
          left: -30%;
          transform: rotate(65.637deg);
        }

        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          flex-shrink: 0;
          border-radius: 1503.398px;
          background: #FDFFFF;
          top: 0;
          left: 0;
          transform: rotate(28.303deg);
        }

        &--bottom-right {
          width: 1642px;
          height: 686px;
          flex-shrink: 0;
          border-radius: 1642px;
          background: color-mix(in srgb, ${resolvedBackgroundShade} 42%, transparent);
          top: 55%;
          left: 33%;
          transform: rotate(65.637deg);
        }
      }
    `,
    backdropBlur: css`
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.55);
      pointer-events: none;
    `,
    logoImage: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 586px;
      max-height: 373px;
      z-index: 1;
    `,
    logoOrbitCW: css`
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: rgba(253, 255, 255, 0.35);
      filter: blur(30px);
      pointer-events: none;
    `,
    logoOrbitCCW: css`
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: rgba(253, 255, 255, 0.35);
      filter: blur(30px);
      pointer-events: none;
    `
  }
}, { hashPriority: 'low' })