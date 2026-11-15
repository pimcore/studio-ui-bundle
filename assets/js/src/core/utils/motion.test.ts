/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { arrowTurnTransition, motionAllowedMediaQuery } from './motion'

// splits the generated css into the part outside and the part inside the no-preference media query
const split = (css: string): { outside: string, inside: string } => {
  const start = css.indexOf(motionAllowedMediaQuery)

  return start === -1
    ? { outside: css, inside: '' }
    : { outside: css.slice(0, start), inside: css.slice(start) }
}

describe('arrowTurnTransition', () => {
  it('only adds the turn, and only without a reduced motion preference', () => {
    const { outside, inside } = split(arrowTurnTransition())

    expect(outside).not.toContain('transition')
    expect(inside).toMatch(/transition: transform \d+ms/)
  })

  it('keeps further transitions for reduced motion and adds the turn without a preference', () => {
    const { outside, inside } = split(arrowTurnTransition('color 100ms ease-out'))

    expect(outside).toContain('transition: color 100ms ease-out;')
    expect(outside).not.toContain('transform')
    expect(inside).toMatch(/transition: color 100ms ease-out, transform \d+ms/)
  })
})
