/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
        inset-inline-end: 0;
        bottom: 0;
        inset-inline-start: 0;
        padding: unset;
        margin: auto;

        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
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
