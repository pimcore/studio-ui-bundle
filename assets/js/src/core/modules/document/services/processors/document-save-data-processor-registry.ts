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
import { AbstractProcessorRegistry, type Processor } from '@Pimcore/modules/app/processor-registry/abstract-processor-registry'
import { AbstractDataContext } from '@Pimcore/modules/app/processor-registry/abstract-data-context'
import { type SaveTaskType } from '../document-save-task-manager'
import type { DocumentUpdateByIdApiArg } from '../../document-api-slice.gen'

export type DocumentSaveUpdateData = DocumentUpdateByIdApiArg['body']['data'] & {
  useDraftData?: boolean
}

/**
 * Context object passed to document save data processors
 */
export class DocumentSaveDataContext extends AbstractDataContext<DocumentSaveUpdateData> {
  constructor (
    public readonly documentId: number,
    public readonly saveTask: SaveTaskType,
    public updateData: DocumentSaveUpdateData
  ) {
    super(updateData)
  }
}

/**
 * Processor for modifying document save data before it's sent to the API.
 * Allows adding, transforming, or enriching data based on custom logic.
 */
export interface DocumentSaveDataProcessor extends Processor<DocumentSaveDataContext> {}

@injectable()
export class DocumentSaveDataProcessorRegistry extends AbstractProcessorRegistry<DocumentSaveDataContext> {}
