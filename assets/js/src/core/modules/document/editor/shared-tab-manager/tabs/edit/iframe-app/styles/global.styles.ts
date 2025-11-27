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

export const DocumentEditorIframeGlobalStyles = createGlobalStyle`
  /* Required field styling for document editables - Default behavior: style direct children of wrapper */
  [data-required-active="true"]:not(:has(.studio-required-field-target)) .studio-required-field-wrapper > * {
    outline: 2px dashed ${props => props.theme.colorError} !important;
    outline-offset: 5px !important;
  }

  /* Required field styling for document editables - Custom target behavior: style specific target element */
  [data-required-active="true"] .studio-required-field-target {
    outline: 2px dashed ${props => props.theme.colorError} !important;
    outline-offset: 5px !important;
  }

  .ant-dropdown-menu,
  .ant-dropdown-menu-sub {
    overflow: auto;
    max-height: 48vh;
  }

  .ant-dropdown-menu-submenu-popup {
    box-shadow: ${props => props.theme.boxShadowSecondary};
  }
`
