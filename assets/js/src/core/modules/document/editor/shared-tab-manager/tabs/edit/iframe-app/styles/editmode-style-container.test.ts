/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getEditmodeStyleContainer } from './editmode-style-container'

describe('getEditmodeStyleContainer', () => {
  it('appends the container at the end of the head', () => {
    const websiteStyle = document.createElement('style')
    websiteStyle.textContent = '.button { background-color: rgb(17, 128, 179); }'
    document.head.appendChild(websiteStyle)

    const container = getEditmodeStyleContainer()

    expect(container.parentNode).toBe(document.head)
    expect(document.head.lastElementChild).toBe(container)
    expect(websiteStyle.compareDocumentPosition(container)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('reuses the same container on subsequent calls', () => {
    expect(getEditmodeStyleContainer()).toBe(getEditmodeStyleContainer())
  })

  it('recreates the container when it was detached from the document', () => {
    const detached = getEditmodeStyleContainer()
    detached.remove()

    const recreated = getEditmodeStyleContainer()

    expect(recreated).not.toBe(detached)
    expect(recreated.parentNode).toBe(document.head)
  })
})
