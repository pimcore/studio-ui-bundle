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
import { AbstractHookProcessorRegistry, type HookProcessor } from '@Pimcore/modules/app/hook-processor-registry/abstract-hook-processor-registry'


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
 * Hook-based document URL processor that can use React hooks directly
 * Processors can handle all URL types and decide based on context
 */
export interface DocumentUrlProcessor extends HookProcessor<DocumentUrlContext> {}

@injectable()
export class DocumentUrlProcessorRegistry extends AbstractHookProcessorRegistry<DocumentUrlContext> {}