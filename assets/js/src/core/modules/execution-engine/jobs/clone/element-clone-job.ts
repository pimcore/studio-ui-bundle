/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type CloneParameters } from '@Pimcore/modules/element/hooks/use-element-api'
import { AbstractCloneJob, type AbstractCloneJobOptions } from './abstract-clone-job'

export interface ElementCloneJobOptions extends AbstractCloneJobOptions {
  parameters: CloneParameters
  elementClone: (params: { id: number, parentId: number, cloneParameters: CloneParameters }) => Promise<{ success: boolean, jobRunId?: string | number }>
}

export class ElementCloneJob extends AbstractCloneJob {
  private readonly parameters: CloneParameters
  private readonly elementClone: ElementCloneJobOptions['elementClone']

  constructor (options: ElementCloneJobOptions) {
    super({
      sourceId: options.sourceId,
      targetId: options.targetId,
      title: options.title,
      elementType: options.elementType,
      treeId: options.treeId,
      nodeId: options.nodeId
    })
    this.parameters = options.parameters
    this.elementClone = options.elementClone
  }

  protected async executeCloneRequest (): Promise<string | number | null> {
    const result = await this.elementClone({
      id: this.sourceId,
      parentId: this.targetId,
      cloneParameters: this.parameters
    })

    return result?.jobRunId ?? null
  }
}
