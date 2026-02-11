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
import { type Element } from '../../element-helper'
import { type ElementIcon } from '@sdk/components'

export class ElementIconContext {
  constructor (
    public readonly element: Element,
    public readonly defaultIcon: ElementIcon,
    public icon: ElementIcon | null = null
  ) {}

  setIcon (icon: ElementIcon): void {
    this.icon = icon
  }

  getIcon (): ElementIcon | null {
    return this.icon
  }

  hasIcon (): boolean {
    return this.icon !== null
  }
}

/**
 * Processor for modifying element icons.
 * Allows customizing element icons based on custom logic.
 */
export interface ElementIconProcessor extends Processor<ElementIconContext> {}

@injectable()
export class ElementIconProcessorRegistry extends AbstractProcessorRegistry<ElementIconContext> {}
