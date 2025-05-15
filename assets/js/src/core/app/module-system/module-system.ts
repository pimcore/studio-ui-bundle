/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface AbstractModule {
  onInit: () => void
}

interface AbstractModuleSystem {
  registerModule: (module: AbstractModule) => void
  initModules: () => void
}

export class ModuleSystem implements AbstractModuleSystem {
  private readonly registry: AbstractModule[] = []

  registerModule (module: AbstractModule): void {
    this.registry.push(module)
  }

  initModules (): void {
    this.registry.forEach(module => {
      module.onInit()
    })
  }
}

const moduleSystem = new ModuleSystem()
export { moduleSystem }
