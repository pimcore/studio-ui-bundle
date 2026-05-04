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
// Orbit keyframes — defined at module scope using emotion's keyframes helper.
// The returned Keyframes object produces a stable, globally-registered name
// that can be safely interpolated into any nested css block without risk of
// the emotion hashing mismatch that broke the previous @keyframes-in-css approach.
// ---------------------------------------------------------------------------

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

const orbitTL = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg)   translateX(340px); }
  to   { transform: translate(-50%, -50%) rotate(360deg) translateX(340px); }
`

const orbitBL = keyframes`
  from { transform: translate(-50%, -50%) rotate(120deg) translateX(220px); }
  to   { transform: translate(-50%, -50%) rotate(480deg) translateX(220px); }
`

const orbitBR = keyframes`
  from { transform: translate(-50%, -50%) rotate(240deg) translateX(400px); }
  to   { transform: translate(-50%, -50%) rotate(600deg) translateX(400px); }
`

// ---------------------------------------------------------------------------
// Logo orbit — two large near-white blobs counter-rotating directly behind
// the logo. Large size + tight radius keeps them centred on the logo.
// Heavy blur and low opacity make them a barely-visible soft halo.
// ---------------------------------------------------------------------------
const logoOrbitCW = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg)    translateX(80px); }
  to   { transform: translate(-50%, -50%) rotate(-360deg) translateX(80px); }
`

const logoOrbitCCW = keyframes`
  from { transform: translate(-50%, -50%) rotate(180deg) translateX(80px); }
  to   { transform: translate(-50%, -50%) rotate(540deg) translateX(80px); }
`

export const useStyle = createStyles(({ css }, { phase, backgroundShade }: StyleProps) => {
  const isLoading = phase === 'loading'
  const isOrbiting = phase === 'loading' || phase === 'outro'
  const resolvedBackgroundShade = backgroundShade !== '' ? backgroundShade : '#722ed1'
  const colorPulse = keyframes`
    0%   { background: color-mix(in srgb, ${resolvedBackgroundShade} 42%, transparent); }
    50%  { background: rgba(55, 217, 243, 0.20); }
    100% { background: color-mix(in srgb, ${resolvedBackgroundShade} 42%, transparent); }
  `

  return {
    background: css`
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: #FFF;
      overflow: hidden;
      opacity: ${isLoading ? 1 : 0.3};
      transition: opacity 900ms ease;

      .background-figure {
        position: absolute;
        filter: blur(310px);

        ${isOrbiting
          ? css`
              top: 50%;
              left: 50%;
            `
          : css`
              transition: top 1200ms ease, left 1200ms ease, transform 1200ms ease;
            `
        }

        &--top-left {
          width: 1324px;
          height: 1324px;
          flex-shrink: 0;
          border-radius: 1324px;
          background: rgba(55, 217, 243, 0.20);

          ${isOrbiting
            ? css`
                animation:
                  ${orbitTL} 11s linear infinite,
                  ${colorPulse} 6s linear 0s infinite;
              `
            : css`
                top: -80%;
                left: -30%;
                transform: rotate(65.637deg);
              `
          }
        }

        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          flex-shrink: 0;
          border-radius: 1503.398px;
          background: #FDFFFF;

          ${isOrbiting
            ? css`
                animation:
                  ${orbitBL} 9s linear infinite,
                  ${colorPulse} 6s linear -2s infinite;
              `
            : css`
                top: 0;
                left: 0;
                transform: rotate(28.303deg);
              `
          }
        }

        &--bottom-right {
          width: 1642px;
          height: 686px;
          flex-shrink: 0;
          border-radius: 1642px;
          background: color-mix(in srgb, ${resolvedBackgroundShade} 42%, transparent);

          ${isOrbiting
            ? css`
                animation:
                  ${orbitBR} 14s linear infinite,
                  ${colorPulse} 6s linear -4s infinite;
              `
            : css`
                top: 55%;
                left: 33%;
                transform: rotate(65.637deg);
              `
          }
        }
      }
    `,
    backdropBlur: css`
      position: absolute;
      inset: 0;
      backdrop-filter: blur(20px);
      pointer-events: none;
    `,
    logoImage: css`      position: absolute;
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
      filter: blur(90px);
      animation: ${logoOrbitCW} 3s linear infinite;
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
      filter: blur(90px);
      animation: ${logoOrbitCCW} 4s linear infinite;
      pointer-events: none;
    `
  }
}, { hashPriority: 'low' })
