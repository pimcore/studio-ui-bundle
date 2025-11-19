/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecorator, type AbstractDecoratorConfig, type AbstractDecoratorProps } from '@sdk/modules/element'

export interface ListingBuilderDecorator {
  name: string
  priority?: number
  decorator: AbstractDecorator
  config?: AbstractDecoratorConfig
}

export interface ListingBuilderDecoratorOverride extends Partial<ListingBuilderDecorator> {
  name: string
}

export interface ListingBuilderConfigEntry<T = AbstractDecoratorConfig> {
  enabled?: boolean
  config?: T
}

export type ListingBuilderConfig = Record<string, ListingBuilderConfigEntry>

export interface ListingBuilderBuildOptions {
  props: AbstractDecoratorProps
  config?: ListingBuilderConfig
}

export interface IListingBuilder {
  addDecorator: (decorator: ListingBuilderDecorator) => this
  overrideDecorator: (decorator: ListingBuilderDecoratorOverride) => this
  removeDecorator: (name: string) => this
  getDecorator: (name: string) => ListingBuilderDecorator | undefined
  getDecorators: () => ListingBuilderDecorator[]
  build: (options: ListingBuilderBuildOptions) => AbstractDecoratorProps
  copy: () => ListingBuilder
}

export class ListingBuilder<T extends IListingBuilder = IListingBuilder> {
  private decorators: ListingBuilderDecorator[] = []

  public addDecorator: T['addDecorator'] = (decorator) => {
    const newDecorator = {
      priority: 0,
      ...decorator
    }

    this.decorators.push(newDecorator)
    this.decorators.sort((a, b) => a.priority! - b.priority!)
    return this
  }

  public overrideDecorator: T['overrideDecorator'] = (decorator) => {
    const index = this.decorators.findIndex(d => d.name === decorator.name)

    if (index === -1) {
      throw new Error(`Decorator with name "${decorator.name}" not found.`)
    }

    this.decorators[index] = {
      ...this.decorators[index],
      ...decorator
    }

    if (decorator.priority !== undefined) {
      this.decorators[index].priority = decorator.priority
      this.decorators.sort((a, b) => a.priority! - b.priority!)
    }

    return this
  }

  public removeDecorator: T['removeDecorator'] = (name) => {
    this.decorators = this.decorators.filter(d => d.name !== name)
    return this
  }

  public getDecorator: T['getDecorator'] = (name) => {
    return this.decorators.find(d => d.name === name)
  }

  public getDecorators: T['getDecorators'] = () => {
    return this.decorators
  }

  public build: T['build'] = ({ props, config }) => {
    const appliedDecorators = this.decorators.filter(decorator => {
      const configEntry = config?.[decorator.name]
      if (configEntry?.enabled === false) {
        return false
      }
      return true
    })

    let composedProps = props

    for (const decorator of appliedDecorators) {
      const configEntry = config?.[decorator.name]
      const decoratorConfig = {
        ...decorator.config,
        ...configEntry?.config
      }
      composedProps = decorator.decorator(composedProps, decoratorConfig)
    }

    return composedProps
  }

  copy: T['copy'] = () => {
    const newBuilder = new ListingBuilder()
    this.decorators.forEach(decorator => {
      newBuilder.addDecorator({ ...decorator })
    })
    return newBuilder
  }
}
