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
    'editable-container': css`
      position: relative;
      height: 30px;

      .input-field {
        font-family: Lato, sans-serif;
        font-size: 12px;
        text-align: center;
        line-height: ${token.controlHeight}px;

        border-radius: ${token.borderRadius}px;
        border-color: ${token.colorBorder};
        background-color: white;

        /* Firefox */
        -moz-appearance: textfield;
      }

      .input-field:focus-visible {
        outline: none;
      }

      /* Chrome, Safari, Edge, Opera */

      .input-field::-webkit-outer-spin-button,
      .input-field::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      & button[type="button"], .input-field {
        display: block;
        position: absolute;
        top: 0;
        padding: unset;
        margin: auto;

        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        border: 1px solid ${token.colorBorder};
        box-shadow: none;
      }

      .input-field.remove-decoration {
        border: none;
        background: none;
      }

      & button.inline-label.display-none, & button.inline-label-dots.display-none, & input.input-field.display-none {
        display: none;
      }

      button.inline-label-dots {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        color: rgba(0, 0, 0, 0.60);
      }

      button.inline-label-dots, button.inline-label {
        font-family: Lato, sans-serif;
        line-height: 30px;
        text-align: center;
        vertical-align: text-bottom;
        box-shadow: none;
        background-color: transparent;
        cursor: text;
      }

      button.inline-label {
        color: ${token.colorPrimary};
        border: 1px solid ${token.colorPrimary};
        border-radius: ${token.borderRadius}px;
      }
    `
  }
}, { hashPriority: 'low' })
