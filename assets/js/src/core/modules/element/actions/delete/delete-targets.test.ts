/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { needsBatchDelete } from './delete-targets'

describe('needsBatchDelete', () => {
  it('deletes a single clicked element on its own', () => {
    expect(needsBatchDelete({ id: '5' }, [{ id: '5' }])).toBe(false)
  })

  it('deletes several elements as a batch', () => {
    expect(needsBatchDelete({ id: '5' }, [{ id: '5' }, { id: '6' }])).toBe(true)
  })

  it('deletes the remaining folder when its selected child was right clicked', () => {
    // folder 10 and its child 11 selected, 11 right clicked: pruning keeps 10
    expect(needsBatchDelete({ id: '11' }, [{ id: 10 }])).toBe(true)
  })

  it('compares ids regardless of their type', () => {
    expect(needsBatchDelete({ id: '5' }, [{ id: 5 }])).toBe(false)
  })

  it('has nothing to batch when nothing is deletable', () => {
    expect(needsBatchDelete({ id: '5' }, [])).toBe(false)
  })
})
