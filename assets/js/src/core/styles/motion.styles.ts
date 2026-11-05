/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createGlobalStyle } from 'antd-style'
import {
  motionDuration,
  motionEaseDecelerate,
  motionEaseInPanel,
  motionEaseOut,
  motionEaseSpring,
  motionReducedMediaQuery
} from '@Pimcore/utils/motion'

const press = `${motionDuration.feedback}ms ease-out`
const fill = `${motionDuration.enter}ms ${motionEaseDecelerate}`
const settle = `${motionDuration.settle}ms ${motionEaseSpring}`
const leave = `${motionDuration.leave}ms ${motionEaseInPanel}`
const glide = `${motionDuration.settle}ms ${motionEaseOut}`
const draw = `${motionDuration.draw}ms ${motionEaseDecelerate}`
// the tick starts once the box has begun to fill
const drawDelay = `${Math.round(motionDuration.enter / 3)}ms`

// check mark on the 16px checkbox (the mark spans the whole box, border included), colored through the background of the mask
const checkMark = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M4.2 8.3 6.9 11 11.9 5.6\' fill=\'none\' stroke=\'%23000\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")'

/**
 * Micro animations of selection controls, following the Material fade pattern (enter ~150ms
 * decelerating, exit ~75ms accelerating):
 * - pressing a checkbox or radio dips it slightly, releasing springs it back
 * - the checkbox fills and its check mark is drawn in from left to right
 * - the radio dot grows in and settles with a soft spring
 * - unchecking fades the mark out quickly
 * - the switch handle glides with a smooth ease-out
 *
 * Only transitions are used, so controls that render already checked (e.g. a full grid) do not animate.
 * The press dip uses the independent `scale` property, so it composes with the antd transforms.
 * The selectors are prefixed with `body` to win over the antd component styles.
 */
export const MotionGlobalStyles = createGlobalStyle`
  /** CHECKBOX **/
  body .ant-checkbox .ant-checkbox-inner {
    transition: background-color ${fill}, border-color ${fill}, scale ${settle};
  }

  body .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):active .ant-checkbox-inner {
    scale: 0.9;
    transition: background-color ${fill}, border-color ${fill}, scale ${press};
  }

  /* the check mark is drawn from left to right like a pen tick: the short stroke first, then the long one */
  body .ant-checkbox:not(.ant-checkbox-indeterminate) .ant-checkbox-inner::after {
    top: 0;
    inset-inline-start: 0;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    transform: none;
    background-color: ${props => props.theme.colorWhite};
    -webkit-mask: ${checkMark} center / 100% 100% no-repeat;
    mask: ${checkMark} center / 100% 100% no-repeat;
    clip-path: inset(0 100% 0 0);
    opacity: 0;
    transition: opacity ${leave}, clip-path 0s linear ${motionDuration.leave}ms;
  }

  body .ant-checkbox-checked:not(.ant-checkbox-indeterminate) .ant-checkbox-inner::after {
    clip-path: inset(0);
    opacity: 1;
    transition: opacity 0s, clip-path ${draw} ${drawDelay};
  }

  body .ant-checkbox-disabled:not(.ant-checkbox-indeterminate) .ant-checkbox-inner::after {
    background-color: ${props => props.theme.colorTextDisabled};
  }

  /** RADIO **/
  body .ant-radio .ant-radio-inner {
    transition: background-color ${fill}, border-color ${fill}, scale ${settle};
  }

  body .ant-radio-wrapper:not(.ant-radio-wrapper-disabled):active .ant-radio-inner {
    scale: 0.9;
    transition: background-color ${fill}, border-color ${fill}, scale ${press};
  }

  body .ant-radio .ant-radio-inner::after {
    transition: opacity ${leave}, transform ${leave};
  }

  body .ant-radio-checked .ant-radio-inner::after {
    transition: opacity ${fill}, transform ${settle};
  }

  /** SWITCH **/
  body .ant-switch {
    transition: background ${glide};
  }

  body .ant-switch .ant-switch-handle,
  body .ant-switch .ant-switch-handle::before {
    transition-duration: ${motionDuration.settle}ms;
    transition-timing-function: ${motionEaseOut};
  }

  /* the press dip replaces the click ripple on selection controls; the ripple is only hidden, so
     antd can still remove it once its transition has ended */
  body .ant-checkbox .ant-wave,
  body .ant-radio .ant-wave,
  body .ant-switch .ant-wave {
    visibility: hidden;
  }

  /* reduced motion: the state change only fades, nothing scales, dips or glides */
  ${motionReducedMediaQuery} {
    body .ant-checkbox-wrapper:active .ant-checkbox-inner,
    body .ant-radio-wrapper:active .ant-radio-inner {
      scale: none;
    }

    body .ant-checkbox:not(.ant-checkbox-indeterminate) .ant-checkbox-inner::after,
    body .ant-checkbox-checked:not(.ant-checkbox-indeterminate) .ant-checkbox-inner::after {
      clip-path: none;
      transition: opacity ${fill};
    }

    body .ant-radio .ant-radio-inner::after,
    body .ant-radio-checked .ant-radio-inner::after {
      transition: opacity ${fill};
    }

    body .ant-switch .ant-switch-handle,
    body .ant-switch .ant-switch-handle::before {
      transition: none;
    }
  }
`
