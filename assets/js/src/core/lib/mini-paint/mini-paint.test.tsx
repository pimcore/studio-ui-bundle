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
import { render } from '@testing-library/react'
import { MiniPaint } from './mini-paint'

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/my-studio/api'
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42 })
}))

jest.mock('@Pimcore/components/iframe/iframe', () => ({
  Iframe: ({ src, title }: { src: string, title: string }) => (
    <iframe
      src={ src }
      title={ title }
    />
  )
}))

describe('MiniPaint', () => {
  it('loads the image editor below the configured api prefix', () => {
    const { container } = render(<MiniPaint />)

    expect(container.querySelector('iframe')).toHaveAttribute('src', '/my-studio/api/image-editor?id=42')
  })
})
