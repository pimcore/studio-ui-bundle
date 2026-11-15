/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { StyleProvider } from 'antd-style'
import { getEditmodeStyleContainer } from './editmode-style-container'

export interface EditmodeStyleProviderProps {
  children: React.ReactNode
}

/**
 * Shields the editmode iframe's studio styles from the website page's CSS.
 *
 * The app shares its document with the website page: `hashPriority="high"`
 * drops the `:where()` wrapper antd normally puts around its selectors, and
 * routing both antd cssinjs and Emotion (antd-style) output through the
 * dedicated `container` (appended at the end of `<head>`) keeps studio styles
 * ordered after the website's own stylesheets. Together these stop an
 * equal-specificity website rule (e.g. `.button`) from winning the cascade
 * against studio components portaled into the page, without renaming any
 * component class name (pimcore/platform-version#233).
 *
 * Extracted from `DocumentEditorIframeAppView` so the cascade behavior can be
 * exercised directly in tests with a minimal component tree.
 */
export const EditmodeStyleProvider = ({ children }: EditmodeStyleProviderProps): React.JSX.Element => (
  <StyleProvider
    container={ getEditmodeStyleContainer() }
    hashPriority='high'
  >
    {children}
  </StyleProvider>
)
