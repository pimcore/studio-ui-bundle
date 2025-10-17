/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { cloneDeep } from 'lodash'

/**
 * Abstract Hook Processor Registry
 * 
 * Registry for hook-based processors that can use React hooks directly.
 * Processors must be called from within React component context.
 */
export interface HookProcessor<TContext> {
  readonly id: string
  readonly priority: number
  useExecute(context: TContext): void
}

export abstract class AbstractHookProcessorRegistry<TContext> {
  protected processors: HookProcessor<TContext>[] = []

  registerProcessor(processor: HookProcessor<TContext>): void {
    this.processors = this.processors.filter(p => p.id !== processor.id)
    
    this.processors.push(processor)
    this.processors.sort((a, b) => b.priority - a.priority)
  }

  unregisterProcessor(id: string): void {
    this.processors = this.processors.filter(p => p.id !== id)
  }

  executeProcessors(context: TContext): void {
    for (const processor of this.processors) {
      try {
        processor.useExecute(context)
      } catch (error) {
        console.warn(`Hook processor ${processor.id} failed:`, error)
      }
    }
  }

  getRegisteredProcessors(): readonly HookProcessor<TContext>[] {
    return [...this.processors]
  }

  hasProcessor(id: string): boolean {
    return this.processors.some(p => p.id === id)
  }
}