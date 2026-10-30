/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { resolveActionTargets } from './selection-targets'

const node = (id: string): { id: string } => ({ id })

describe('resolveActionTargets', () => {
  it('acts on the whole selection when the node is part of it', () => {
    const selection = [node('2'), node('3'), node('4')]

    expect(resolveActionTargets(node('3'), selection)).toEqual(selection)
  })

  it('acts on the node alone when it is outside the selection', () => {
    expect(resolveActionTargets(node('9'), [node('2'), node('3')])).toEqual([node('9')])
  })

  it('acts on the node alone when only it is selected', () => {
    expect(resolveActionTargets(node('2'), [node('2')])).toEqual([node('2')])
  })

  it('acts on the node alone without a selection', () => {
    expect(resolveActionTargets(node('2'), [])).toEqual([node('2')])
  })

  it('compares ids across types', () => {
    const selection = [{ id: 2 }, { id: 3 }]

    expect(resolveActionTargets({ id: '2' } as unknown as { id: number }, selection)).toEqual(selection)
  })
})
