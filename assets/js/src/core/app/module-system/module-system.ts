/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
