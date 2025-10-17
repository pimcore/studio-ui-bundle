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


/**
 * Context for document URL processing operations
 */
export class DocumentUrlContext {
  private readonly parameters: Record<string, string>

  constructor(
    public readonly documentId: number,
    public readonly processorType: 'preview' | 'edit',
    public readonly baseUrl: string,
    baseParameters: Record<string, string> = {}
  ) {
    this.parameters = { ...baseParameters }
  }

  addParam(key: string, value: string): void {
    this.parameters[key] = value
  }

  getParams(): Readonly<Record<string, string>> {
    return { ...this.parameters }
  }
}

/**
 * Document URL processor that modifies URL parameters for edit or preview URLs
 */
export interface DocumentUrlProcessor extends Processor<DocumentUrlContext> {}

@injectable()
export class DocumentUrlProcessorRegistry extends AbstractProcessorRegistry<DocumentUrlContext> {}