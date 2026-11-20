/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * antd 5.29's Tabs CSS contains selectors jsdom's selector engine cannot parse
 * (e.g. ':focus-visible' in a nested rule), which makes getComputedStyle throw
 * while testing-library checks role accessibility. Fall back to an empty style
 * for such elements; the tests only assert tab labels and order.
 */
export const installJsdomSafeComputedStyle = (): void => {
  const original = window.getComputedStyle.bind(window)

  jest.spyOn(window, 'getComputedStyle').mockImplementation((element: Element, pseudo?: string | null) => {
    try {
      return original(element, pseudo)
    } catch {
      return original(document.createElement('div'))
    }
  })
}
