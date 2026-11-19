/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getWorkflowActions } from './workflow-types'
import { type WorkflowDetails } from '../../../shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

const workflow = (behaviours: Array<string | undefined>): WorkflowDetails => ({
  workflowName: 'wf',
  allowedTransitions: behaviours.map((unsavedChangesBehaviour, index) => ({
    name: `t${index}`,
    label: `T${index}`,
    unsavedChangesBehaviour
  })),
  globalActions: [{ name: 'g', label: 'G' }]
}) as unknown as WorkflowDetails

describe('getWorkflowActions', () => {
  it('passes the unsaved-changes behaviour of each transition on', () => {
    const actions = getWorkflowActions(workflow(['save', 'warn', 'ignore']))

    expect(actions.map((action) => action.unsavedChangesBehaviour)).toEqual(['save', 'warn', 'ignore', undefined])
  })

  it('drops unknown or missing behaviours', () => {
    const actions = getWorkflowActions(workflow(['bogus', undefined]))

    expect(actions[0].unsavedChangesBehaviour).toBeUndefined()
    expect(actions[1].unsavedChangesBehaviour).toBeUndefined()
  })
})
