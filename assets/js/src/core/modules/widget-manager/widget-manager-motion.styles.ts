/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  motionAllowedMediaQuery,
  motionDuration,
  motionEaseInPanel,
  motionEaseOut,
  motionEaseOutPanel
} from '@Pimcore/utils/motion'

// the clipped area leaves room for the panel shadow
const locations = [
  // [border location, clip-path of the closed panel]
  ['left', 'inset(-40px 100% -40px -24px)'],
  ['right', 'inset(-40px -24px -40px 100%)'],
  ['bottom', 'inset(100% -24px -40px -24px)']
] as const

const revealed = 'inset(-40px -24px)'

const enter = `${motionDuration.panelEnter}ms ${motionEaseOutPanel}`
const leave = `${motionDuration.panelLeave}ms ${motionEaseInPanel}`

const hidden = (location: string): string => `.flexlayout__tab_border_${location}[style*='visibility: hidden']`

// the side bar has no selected widget anymore: the panel closes, as opposed to switching widgets
const closing = (location: string): string =>
  `.flexlayout__layout:not(:has(> .flexlayout__border_${location} .flexlayout__border_button--selected)) > ${hidden(location)}`

// the closing panel stays visible and above the main area until it has folded back
const keepVisibleWhileLeaving = `visibility 0s linear ${motionDuration.panelLeave}ms, z-index 0s linear ${motionDuration.panelLeave}ms`

// everything of the main area that flexlayout positions: tab bars, tab contents and splitters
const mainArea = '> .flexlayout__layout > :is(.flexlayout__tabset, .flexlayout__tab:not(.flexlayout__tab_border), .flexlayout__splitter)'
const resize = (timing: string): string => `left ${timing}, top ${timing}, width ${timing}, height ${timing}`

/**
 * Motion of side widgets (flexlayout border tabs), interpolated into the widget manager root rule.
 *
 * An opened side widget unfolds from its side bar while the main area makes room for it at the
 * same pace, and both move back together when the side bar is closed. The `widget-manager--side-widget-*`
 * classes are only set while a side bar opens or closes (see useSideWidgetMotion), so window
 * resizing, splitters and switching between widgets of an open side bar stay instant.
 * Hidden widgets stay mounted (useVisibility), so nothing is re-rendered.
 */
export const sideWidgetMotion = `
        .flexlayout__tab_border {
          z-index: 2;

          &[style*='visibility: hidden'] {
            opacity: 0;
            pointer-events: none;
            transition: none;
          }
        }

        &.widget-manager--side-widget-opening .flexlayout__tab_border {
          transition: opacity ${enter};
        }

        ${locations.map(([location]) => `
        ${closing(location)} {
          transition: opacity ${leave}, ${keepVisibleWhileLeaving};
        }`).join('')}

        /* the unfolding and the resizing main area are skipped with a reduced motion preference */
        ${motionAllowedMediaQuery} {
          .flexlayout__tab_border {
            clip-path: ${revealed};
          }

          &.widget-manager--side-widget-opening .flexlayout__tab_border {
            transition: opacity ${motionDuration.enter}ms ${motionEaseOut}, clip-path ${enter};
          }

          ${locations.map(([location, clipped]) => `
          ${hidden(location)} {
            clip-path: ${clipped};
          }

          ${closing(location)} {
            transition: opacity ${leave}, clip-path ${leave}, ${keepVisibleWhileLeaving};
          }`).join('')}

          &.widget-manager--side-widget-opening ${mainArea} {
            transition: ${resize(enter)};
          }

          &.widget-manager--side-widget-closing ${mainArea} {
            transition: ${resize(leave)};
          }
        }
`
