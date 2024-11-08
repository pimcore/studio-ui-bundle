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

import type { Meta, StoryObj } from '@storybook/react'
import { SanitizeHtml, type SanitizeHtmlProps } from './sanitize-html'

const config: Meta = {
  title: 'Components/Security/Sanitize HTML',
  component: SanitizeHtml,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<SanitizeHtmlProps> = {
  args: {
    html: `
      <h1>Sanitize HTML</h1>

      <script>alert('XSS')</script>
      <img src="https://example.com/image.jpg" onerror="alert('XSS')">
      <a href="javascript:alert('XSS')">Click me</a>
    `
  }
}

export const WithOptions: StoryObj<SanitizeHtmlProps> = {
  args: {
    html: `
      <div>
        <h1>Sanitize HTML</h1>
      </div>
      
      <div>
        <a href="https://www.npmjs.com/package/dompurify">Check configuration options</a>
      </div>
      
      <div>
        <script>alert('XSS')</script>
        <img src="https://example.com/image.jpg" onerror="alert('XSS')">
        <a href="javascript:alert('XSS')">Click me</a>
      </div>
      

    `,
    options: {
      ALLOWED_TAGS: ['a', 'div'],
      ALLOWED_ATTR: ['href']
    }
  }
}
