/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'

/**
 * Shared motion rules for micro animations.
 *
 * Studio is used for hours a day, so animations stay short, only run on an actual change and never
 * block the user: small feedback runs for ~100ms, controls settle within ~260ms, docked panels take
 * ~320ms to open, and leaving is always faster than entering.
 *
 * Movement (translate, scale, rotate) is only applied when the user has no reduced motion
 * preference. With reduced motion, color and opacity changes remain, as they still carry
 * the state change without moving anything on screen.
 */

/** Wraps CSS rules that move elements, so they only apply without a reduced motion preference. */
export const motionAllowedMediaQuery = '@media (prefers-reduced-motion: no-preference)'

/** Wraps CSS rules that replace movement for users that prefer reduced motion. */
export const motionReducedMediaQuery = '@media (prefers-reduced-motion: reduce)'

/** Durations in ms, aligned with the antd motion tokens (motionDurationFast / motionDurationMid). */
export const motionDuration = {
  /** Small feedback: icon swaps, checkmarks, hover states. */
  feedback: 100,
  /** Appearing content: popovers, small elements, filling a control. */
  enter: 150,
  /** Elements that settle into their final state, e.g. a check mark or a switch handle. */
  settle: 260,
  /** Quick exit of small elements, e.g. unchecking (Material fade pattern: exits take half as long). */
  leave: 75,
  /** Drawing a stroke, e.g. a check mark. */
  draw: 200,
  /** Docked panels that unfold from an edge. */
  panelEnter: 320,
  /** Docked panels that fold back into their edge. */
  panelLeave: 220,
  /** How long a confirmation such as "copied" stays visible. */
  confirmation: 1200
} as const

/** Ease-out for appearing elements, so they settle softly without overshoot. */
export const motionEaseOut = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Stronger ease-out for panels: most of the movement happens right away, the end settles gently. */
export const motionEaseOutPanel = 'cubic-bezier(0.16, 1, 0.3, 1)'

/** Soft spring for small elements: overshoots by a few percent and settles, without bouncing. */
export const motionEaseSpring = 'cubic-bezier(0.34, 1.4, 0.64, 1)'

/** Decelerate (Material): entering elements arrive at full speed and slow down. */
export const motionEaseDecelerate = 'cubic-bezier(0, 0, 0.2, 1)'

/** Ease-in for leaving panels: they start gently and speed up into their edge. */
export const motionEaseInPanel = 'cubic-bezier(0.4, 0, 1, 1)'

/**
 * Transition of expand arrows: one arrow turns between its closed and open direction with a soft
 * spring. With a reduced motion preference it switches direction instantly. Further transitions of
 * the same element can be passed: they are kept in both cases, only the turn depends on the preference.
 */
export const arrowTurnTransition = (otherTransitions?: string): string => {
  const turn = `transform ${motionDuration.settle}ms ${motionEaseSpring}`

  if (isUndefined(otherTransitions)) {
    return `
      ${motionAllowedMediaQuery} {
        transition: ${turn};
      }
    `
  }

  return `
    transition: ${otherTransitions};

    ${motionAllowedMediaQuery} {
      transition: ${otherTransitions}, ${turn};
    }
  `
}
