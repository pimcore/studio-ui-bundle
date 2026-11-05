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
import { motionAllowedMediaQuery, motionDuration, motionEaseOut } from '@Pimcore/utils/motion'

/** Class set for the duration of a one-off click animation, see useIconClickMotion. */
export const iconClickMotionClass = 'pimcore-icon--click-motion'

/** Icons that animate once when the control they sit in is clicked. */
export const iconClickMotionIcons = ['refresh']

/**
 * Controls whose icons react: buttons and menu items. Generic `role="button"` elements are left out,
 * as e.g. every grid cell has that role and may show these icons as plain content.
 */
export const iconMotionControls = '.ant-btn, .ant-dropdown-menu-item'

// icons only change when the control they belong to is hovered or pressed, never on their own
const interactive = ':is(.ant-btn:not(:disabled), .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled))'
const hover = `${interactive}:hover`
const press = `${interactive}:active`

const lift = `${motionDuration.enter}ms ${motionEaseOut}`
const turn = `${motionDuration.settle}ms ${motionEaseOut}`
const back = `${motionDuration.feedback}ms ease-out`

const hoverMediaQuery = `${motionAllowedMediaQuery} and (hover: hover)`

// outlined and dashed buttons whose icon is the trash, e.g. the delete buttons of relation fields
const borderedTrashButton = ':is(.ant-btn-variant-outlined, .ant-btn-variant-dashed):not(:disabled):not(.ant-btn-disabled):has(.pimcore-icon-trash)'

// icon parts are classes in the SVG files, which the SVG optimizer prefixes with the file name
const lid = "[class*='icon-part-lid']"

/**
 * Micro interactions of action icons, held while hovering:
 * - delete: the icon takes the error color and the trash lid lifts, pressing closes it again
 * - refresh: turns slightly in its arrow direction and spins once on click
 * Movements are skipped with a reduced motion preference, the color change of delete remains.
 */
export const IconMotionGlobalStyles = createGlobalStyle`
  /** DELETE: the icon turns into the error color, also with reduced motion **/
  .pimcore-icon-trash {
    transition: color ${lift};
  }

  @media (hover: hover) {
    ${hover} .pimcore-icon-trash {
      color: ${props => props.theme.colorError};
    }
  }

  ${press} .pimcore-icon-trash {
    color: ${props => props.theme.colorErrorActive};
  }

  /* a bordered delete button takes the error color for its border as well */
  @media (hover: hover) {
    body ${borderedTrashButton}:hover {
      border-color: ${props => props.theme.colorError};
    }
  }

  body ${borderedTrashButton}:active {
    border-color: ${props => props.theme.colorErrorActive};
  }

  ${motionAllowedMediaQuery} {
    /** DELETE: the lid lifts straight up **/
    .pimcore-icon-trash ${lid} {
      transition: transform ${lift};
    }

    /** REFRESH: turns counterclockwise, like its arrows **/
    .pimcore-icon-refresh svg {
      transition: transform ${turn};
    }

    .pimcore-icon-refresh.${iconClickMotionClass} svg {
      animation: pimcore-icon-spin ${motionDuration.panelEnter + 180}ms ${motionEaseOut};
    }
  }

  ${hoverMediaQuery} {
    ${hover} .pimcore-icon-trash ${lid} {
      transform: translateY(-1.5px);
    }

    ${hover} .pimcore-icon-refresh svg {
      transform: rotate(-30deg);
    }
  }

  ${motionAllowedMediaQuery} {
    /* pressing closes the lid again */
    ${press} .pimcore-icon-trash ${lid} {
      transform: none;
      transition: transform ${back};
    }
  }

  @keyframes pimcore-icon-spin {
    from {
      transform: rotate(-30deg);
    }

    to {
      transform: rotate(-390deg);
    }
  }
`
