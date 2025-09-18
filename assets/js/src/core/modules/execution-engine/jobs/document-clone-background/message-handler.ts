/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { StepBasedProgressJobHandler } from '@Pimcore/modules/execution-engine/jobs/handlers/step-based-progress-job-handler'
import { store } from '@Pimcore/app/store'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { type DocumentCloneJobConfig } from './types'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { topics } from '../../topics'
import { type NonEmptyArray } from '@Pimcore/types/non-empty-array'

@injectable()
export class DocumentCloneJobHandler extends StepBasedProgressJobHandler<DocumentCloneJobConfig> {
  static readonly TOPICS: NonEmptyArray<string> = [
    topics['cloning-finished']
  ] as NonEmptyArray<string>

  protected getJobType (): string {
    return 'document-clone-background'
  }

  protected getCustomTopics (): NonEmptyArray<string> {
    return [topics['cloning-finished']] as NonEmptyArray<string>
  }

  protected getJobCompletion (): (data: any) => Promise<void> {
    return async (data: any) => {
      store.dispatch(refreshNodeChildren({
        elementType: this.config.parentFolderType,
        nodeId: this.config.parentFolderId.toString()
      }))
    }
  }
}
