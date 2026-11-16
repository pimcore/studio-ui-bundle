/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { toTreeNodeWorkflowStates } from './tree-node-workflow-states'

describe('toTreeNodeWorkflowStates', () => {
  it('keeps only what the tree dot needs', () => {
    const states = [
      { color: '#ffa500', colorInverted: false, title: 'edit_text', label: 'Edit Text', layoutId: null, visibleInDetail: true }
    ]

    expect(toTreeNodeWorkflowStates(states)).toEqual([{ title: 'edit_text', label: 'Edit Text', color: '#ffa500' }])
  })

  it('keeps an empty list, which means the element has no states', () => {
    expect(toTreeNodeWorkflowStates([])).toEqual([])
  })

  it('returns undefined when the states are unknown', () => {
    expect(toTreeNodeWorkflowStates(null)).toBeUndefined()
    expect(toTreeNodeWorkflowStates(undefined)).toBeUndefined()
  })
})
