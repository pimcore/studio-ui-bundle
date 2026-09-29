/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

let styleContainer: HTMLElement | null = null

/**
 * Container for all css-in-js styles of the editmode iframe app.
 *
 * In editmode the app shares its document with the website page, so the studio
 * styles compete with the website CSS in one cascade. By default both cssinjs
 * (antd) and emotion (antd-style) prepend their style tags to the head, where
 * the website stylesheets — loaded later in source order — win every tie in
 * specificity (e.g. a website `.button` rule beating the styling of the studio
 * Button component, see pimcore/platform-version#233). Collecting the studio
 * styles in a dedicated element appended at the end of the head turns that
 * order around without touching any component class names.
 *
 * A module-scoped singleton, so repeated renders (incl. StrictMode double
 * rendering) reuse one element.
 */
export const getEditmodeStyleContainer = (): HTMLElement => {
  if (isNil(styleContainer?.parentNode)) {
    styleContainer = document.createElement('div')
    styleContainer.dataset.studioEditmodeStyles = ''
    document.head.appendChild(styleContainer)
  }

  return styleContainer
}
