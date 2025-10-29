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

/**
 * Abstract Processor Registry
 *
 * Base class for managing collections of processors that transform or modify context objects.
 * Processors are executed in priority order (highest to lowest) and can be registered/unregistered dynamically.
 *
 * Each processor receives a context object and can modify it through its execute method.
 * This pattern allows for extensible, plugin-based functionality where external code can
 * register processors to extend core behavior.
 *
 * @template TContext - The type of context object that processors will receive
 */
export interface Processor<TContext> {
  readonly id: string
  readonly priority: number
  execute: (context: TContext) => void
}

@injectable()
export abstract class AbstractProcessorRegistry<TContext> {
  protected processors: Array<Processor<TContext>> = []

  registerProcessor (processor: Processor<TContext>): void {
    this.processors = this.processors.filter(p => p.id !== processor.id)

    this.processors.push(processor)
    this.processors.sort((a, b) => b.priority - a.priority)
  }

  unregisterProcessor (id: string): void {
    this.processors = this.processors.filter(p => p.id !== id)
  }

  executeProcessors (context: TContext): void {
    for (const processor of this.processors) {
      try {
        processor.execute(context)
      } catch (error) {
        console.warn(`Processor ${processor.id} failed:`, error)
      }
    }
  }

  getRegisteredProcessors (): ReadonlyArray<Processor<TContext>> {
    return [...this.processors]
  }

  hasProcessor (id: string): boolean {
    return this.processors.some(p => p.id === id)
  }
}
