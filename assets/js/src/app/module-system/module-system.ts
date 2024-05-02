interface AbstractModule {
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
