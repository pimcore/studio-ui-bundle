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
