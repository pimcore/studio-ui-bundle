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
import { DynamicTypeRegistryAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type DynamicTypeDocumentEditableAbstract, type AbstractDocumentEditableDefinition } from './dynamic-type-document-editable-abstract'

@injectable()
export class DynamicTypeDocumentEditableRegistry extends DynamicTypeRegistryAbstract<DynamicTypeDocumentEditableAbstract> {
  /**
   * Calls onDocumentReady for all registered dynamic types
   * @param documentId The ID of the document
   * @param editableDefinitions All editable definitions in the document
   */
  notifyDocumentReady (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
    this.getDynamicTypes().forEach(dynamicType => {
      dynamicType.onDocumentReady(documentId, editableDefinitions)
    })
  }
}
