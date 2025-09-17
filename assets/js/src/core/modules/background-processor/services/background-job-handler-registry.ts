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
import { type AbstractBackgroundJobHandler } from '@Pimcore/modules/background-processor/handlers/abstract-background-job-handler'

export interface HandlerClassMetadata {
  handlerClass: any // Use any to avoid constructor signature conflicts
  topics: string[]
  name: string
}

/**
 * Registry for background job handler classes
 * Stores handler classes (not instances) to avoid DI instantiation issues
 */
@injectable()
export class BackgroundJobHandlerRegistry {
  private readonly handlerClasses = new Map<string, HandlerClassMetadata>()

  /**
   * Register a handler class with its metadata
   */
  registerHandlerClass(metadata: HandlerClassMetadata): void {
    this.handlerClasses.set(metadata.name, metadata)
    console.log(`📝 Registered background job handler class: ${metadata.name} with ${metadata.topics.length} topics`)
  }

  /**
   * Get all topics from registered handler classes
   */
  getAllTopics(): string[] {
    const allTopics = new Set<string>()
    
    this.handlerClasses.forEach(metadata => {
      metadata.topics.forEach(topic => allTopics.add(topic))
    })
    
    return Array.from(allTopics)
  }

  /**
   * Get all registered handler class names
   */
  getRegisteredHandlerNames(): string[] {
    return Array.from(this.handlerClasses.keys())
  }

  /**
   * Get handler class by name
   */
  getHandlerClass(name: string): any | undefined {
    return this.handlerClasses.get(name)?.handlerClass
  }

  /**
   * Get handler metadata by name
   */
  getHandlerMetadata(name: string): HandlerClassMetadata | undefined {
    return this.handlerClasses.get(name)
  }

  /**
   * Get all registered handler metadata
   */
  getAllHandlerMetadata(): HandlerClassMetadata[] {
    return Array.from(this.handlerClasses.values())
  }

  /**
   * Validate that a handler instance uses only registered topics
   * Throws an error if the handler uses unregistered topics
   */
  validateHandlerTopics(handler: AbstractBackgroundJobHandler): void {
    const handlerClass = handler.constructor as any
    const handlerTopics = handlerClass.TOPICS || []
    const registeredTopics = this.getAllTopics()
    
    const unregisteredTopics = handlerTopics.filter((topic: string) => !registeredTopics.includes(topic))
    
    if (unregisteredTopics.length > 0) {
      const handlerName = handlerClass.name || 'Unknown'
      throw new Error(
        `❌ BackgroundJobHandlerRegistry: Handler "${handlerName}" uses topics that are not registered: [${unregisteredTopics.join(', ')}]. ` +
        `Please register your handler class in the BackgroundJobHandlerRegistry first. ` +
        `Available topics: [${registeredTopics.join(', ')}]`
      )
    }
    
    console.log(`✅ BackgroundJobHandlerRegistry: Handler topics validated successfully for ${handlerClass.name}`)
  }
}
