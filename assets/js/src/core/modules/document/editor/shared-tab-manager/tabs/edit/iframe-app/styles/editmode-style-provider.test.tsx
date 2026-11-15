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
import { Button } from 'antd'
import { EditmodeStyleProvider } from './editmode-style-provider'
import { getEditmodeStyleContainer } from './editmode-style-container'

const getContainerStyleText = (): string => {
  const container = getEditmodeStyleContainer()

  return Array.from(container.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n')
}

describe('EditmodeStyleProvider', () => {
  it('routes antd styles into the editmode container without the :where() specificity wrapper', () => {
    render(
      <EditmodeStyleProvider>
        <Button type='primary'>Test</Button>
      </EditmodeStyleProvider>
    )

    const css = getContainerStyleText()

    // Sanity check that antd's cssinjs output actually landed in our container.
    expect(css).toEqual(expect.stringContaining('.ant-btn'))

    // hashPriority='high' must drop the :where() wrapper around component
    // selectors (specificity 0,1,0 -> 0,2,0); otherwise an equal-specificity
    // website rule (e.g. `.button`) wins the cascade again, which is the bug
    // reported in pimcore/platform-version#233.
    expect(css).not.toEqual(expect.stringContaining(':where('))
  })

  it('does not leak the component styles into <head> outside of the editmode container', () => {
    render(
      <EditmodeStyleProvider>
        <Button type='primary'>Test</Button>
      </EditmodeStyleProvider>
    )

    const container = getEditmodeStyleContainer()
    const styleTagsOutsideContainer = Array.from(document.head.querySelectorAll('style'))
      .filter((style) => !container.contains(style))
    const cssOutsideContainer = styleTagsOutsideContainer.map((style) => style.textContent).join('\n')

    expect(cssOutsideContainer).not.toEqual(expect.stringContaining('.ant-btn'))
  })
})
