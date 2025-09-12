/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { injectable } from 'inversify'
import { type ComponentType } from 'react'

export interface WidgetTypeDefinition {
  readonly id: string
  form: ComponentType
}

export interface WidgetTypeRegistryInterface {
  registerWidgetType: (type: WidgetTypeDefinition) => void
  getWidgetType: (id: string, throwException?: boolean) => WidgetTypeDefinition | undefined
  hasWidgetType: (id: string) => boolean
  getAllWidgetTypes: () => WidgetTypeDefinition[]
  overrideWidgetType: (type: WidgetTypeDefinition) => void
}

@injectable()
export class WidgetTypeRegistry implements WidgetTypeRegistryInterface {
  protected readonly widgetFormTypes = new Map<string, WidgetTypeDefinition>()

  registerWidgetType (type: WidgetTypeDefinition): void {
    if (this.widgetFormTypes.has(type.id)) {
      trackError(new GeneralError(`Widget form type with id "${type.id}" already exists`))
      return
    }

    this.widgetFormTypes.set(type.id, type)
  }

  getWidgetType (id: string, throwException: boolean = true): WidgetTypeDefinition | undefined {
    const widgetFormType = this.widgetFormTypes.get(id)

    if (widgetFormType === undefined && throwException) {
      trackError(new GeneralError(`Widget form type with id "${id}" not found`))
    }

    return widgetFormType
  }

  hasWidgetType (id: string): boolean {
    return this.widgetFormTypes.has(id)
  }

  getAllWidgetTypes (): WidgetTypeDefinition[] {
    return Array.from(this.widgetFormTypes.values())
  }

  overrideWidgetType (type: WidgetTypeDefinition): void {
    if (!this.widgetFormTypes.has(type.id)) {
      trackError(new GeneralError(`Widget form type with id "${type.id}" not found`))
      return
    }

    this.widgetFormTypes.set(type.id, type)
  }
}
