/**
 * This source file is available under the terms     // Apply enhanced styles to block entry items for spacing
    & .pimcore_block_entry {
      padding: 10px;
    }

    // Add margin-top to all entries except the first one
    & .pimcore_block_entry:not(:first-child) {
      margin-top: 20px;
    }mcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useBlockEditableStyles = createStyles(({ token, css }) => ({
  blockContainer: css`
    position: relative;
  `,

  blockToolstrip: css`
    display: inline-block;
    width: fit-content;
    background-color: ${token.colorBgContainer};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    box-shadow: ${token.boxShadowSecondary};
  `,

  // Dragging state class for the container
  draggingState: css`
    // Hide ALL controls while dragging
    .pimcore_block_buttons .tool-strip {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `,

  // Global dragging state - when this class is on body, hide all toolbars
  globalDraggingState: css`
    // When applied to body, hide all elements with pimcore-hide-on-drag class
    .pimcore-hide-on-drag {
      display: none !important;
    }
  `,

  // Enhanced container class for DOM manipulation
  enhancedContainer: css`
    position: relative;

    // Ensure block entries are positioned relatively for absolute controls
    & .pimcore_block_entry {
      position: relative;
    }

    // Add padding top and bottom to all block entries except the first and last
    & .pimcore_block_entry {
      margin-top: 40px;
      padding: 10px;
    }

    // Position the button containers absolutely but keep them visible for React portals
    & .pimcore_block_buttons {
      position: absolute;
      top: -40px; // Position above the block entry
      left: 0; // Align with left edge of block
      z-index: 10;
      pointer-events: none;

      // Hide the original Pimcore button divs (empty placeholders)
      > div:not(.tool-strip) {
        display: none !important;
      }

      // Hide the React ToolStrip component by default
      .tool-strip {
        opacity: 0;
        visibility: hidden;
        transition: opacity ${token.motionDurationMid}, visibility ${token.motionDurationMid};
        pointer-events: none;
      }
    }

    // For nested blocks: hide all nested controls by default
    & .pimcore_block_entry .pimcore_block_entry .pimcore_block_buttons .tool-strip {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    // Block item hover styles - show ToolStrip on direct hover only (not bubbled from children)
    & .pimcore_block_entry:hover > .pimcore_block_buttons {
      pointer-events: auto;

      .tool-strip {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    }

    // Add dashed outline to hovered block content
    & .pimcore_block_entry:hover {
      outline: 1px dashed ${token.colorPrimaryBorder} !important;
      outline-offset: 5px !important;
    }

    // For nested blocks: show controls only for the directly hovered nested item
    & .pimcore_block_entry .pimcore_block_entry:hover > .pimcore_block_buttons {
      pointer-events: auto;

      .tool-strip {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
    }

    // Ensure parent controls remain visible when hovering nested items
    & .pimcore_block_entry:hover > .pimcore_block_buttons .tool-strip {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  `,

  // Drag and drop states
  dragDropTarget: css`

  `,

  dragActive: css`
    opacity: 0.3 !important;
    background-color: ${token.colorPrimaryBg} !important;
  `
}))
