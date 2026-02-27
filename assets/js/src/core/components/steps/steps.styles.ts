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

export const useStyles = createStyles(({ token, css }) => {
  return {
    steps: css`
      /* Bottom border on the nav bar + remove Ant Design's built-in
         padding-top so all items sit flush at the top — no offset needed. */
      &.ant-steps-navigation {
        border-bottom: ${token.lineWidth}px solid ${token.colorSplit};
        padding-top: 0;
      }

      /* Finish icon: always white, including on hover.
         Ant Design's hover rule (wrapped in :where() — zero specificity) sets
         .ant-steps-icon color to colorPrimary for non-active/non-process items,
         making the white checkmark invisible. !important is required because the
         rule is injected after ours in source order, so specificity alone loses. */
      &.ant-steps-navigation .ant-steps-item-finish .ant-steps-item-icon .ant-steps-icon {
        color: ${token.colorTextLightSolid} !important;
      }

      /* WAIT: title color override (default is colorTextDescription) */
      .ant-steps-item-wait .ant-steps-item-title {
        color: ${token.colorText};
      }

      /* All items: uniform margin-right (paddingXL gap for the ::after arrow),
         uniform height, and flex centering so the container is always
         vertically and horizontally centered — identical for every state. */
      &.ant-steps-navigation .ant-steps-item {
        margin-right: ${token.paddingXL}px;
        height: calc(${token.paddingSM}px + 36px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Reset the inner container so it sizes to its content and lets the
         parent flex centering do the positioning work. */
      &.ant-steps-navigation .ant-steps-item .ant-steps-item-container {
        margin: 0;
        padding: 0;
        height: auto;
      }

      /* PROCESS (active): background highlight only — no margin/padding changes. */
      &.ant-steps-navigation .ant-steps-item-process {
        background-color: ${token.colorFillAlter};
      }

      /* Arrow (::after) centering: vertically centered via top: 50%.
         Horizontally centered in the uniform paddingXL gap via inset-inline-start:
         gap = paddingXL (32px), arrow = 10px wide, so offset from item right edge
         = (32 - 10) / 2 = 11px = paddingXL/2 - 5px.
         This applies to ALL arrows uniformly — active, finish, and wait. */
      &.ant-steps-navigation .ant-steps-item::after {
        top: 50%;
        inset-inline-start: calc(100% + ${token.paddingXL / 2 - 5}px);
      }

      /* The finish-step arrow sits exactly at the left edge of the next item.
         When the next item is active its colored background covers the default
         gray arrow (rgb(217,217,217)), making it nearly invisible.
         Two fixes: raise z-index so the arrow paints above the next item's
         background, and use colorPrimary for the arrow border to ensure it
         contrasts with any background color (matching the finish icon color). */
      &.ant-steps-navigation .ant-steps-item-finish {
        z-index: 1;
      }

      &.ant-steps-navigation .ant-steps-item-finish::after {
        border-color: ${token.colorPrimary};
      }

      /* All icons: use flex for true center alignment of the number/icon */
      .ant-steps-item-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Process icon: purple fill + white number — internal tokens only */
      .ant-steps-item-process .ant-steps-item-icon {
        background-color: ${token.colorPrimary};
        border-color: ${token.colorPrimary};
      }

      .ant-steps-item-process .ant-steps-item-icon .ant-steps-icon {
        color: ${token.colorTextLightSolid};
      }

      /* Process title: dark color (default is colorText, but re-state for clarity) */
      .ant-steps-item-process .ant-steps-item-title {
        color: ${token.colorText};
      }

      /* Finish icon: purple fill + white checkmark */
      .ant-steps-item-finish .ant-steps-item-icon {
        background-color: ${token.colorPrimary};
        border-color: ${token.colorPrimary};
      }

      /* Finish title: dark */
      .ant-steps-item-finish .ant-steps-item-title {
        color: ${token.colorText};
      }
    `
  }
})
