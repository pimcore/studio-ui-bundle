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
import DOMPurify from 'dompurify'

export interface SanitizeHtmlProps {
  html: string
  options?: DOMPurify.Config
}

export const SanitizeHtml = ({ html, options }: SanitizeHtmlProps): React.JSX.Element => {
  let cleanHtml: string

  if (options !== undefined) {
    cleanHtml = DOMPurify.sanitize(html, options)
  } else {
    cleanHtml = DOMPurify.sanitize(html)
  }

  return <div dangerouslySetInnerHTML={ { __html: cleanHtml } } />
}
