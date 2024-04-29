import { container } from '@Pimcore/app/depency-injection'
import { type Container } from 'inversify'

export interface lifeCycleEvents {
  onInit: (config: { container: Container }) => void
}

export interface abstractPlugin extends lifeCycleEvents {
  name: string
}

export class PluginSystem {
  private registry: Record<string, abstractPlugin> = {}

  async loadPlugins (): Promise<void> {
    const promises: any[] = []
    document.querySelectorAll('[data-pimcore-studio-plugin]').forEach((element: HTMLScriptElement) => {
      const promise = new Promise((resolve, reject) => {
        const src = element.dataset.pimcoreStudioPlugin!

        element.addEventListener('load', () => {
          element.removeAttribute('data-pimcore-studio-plugin')
          resolve(true)
        })

        element.onerror = reject
        element.setAttribute('src', src)
      })

      promises.push(promise)
    })

    await Promise.all(promises)
  }

  registerPlugin (plugin: abstractPlugin): void {
    this.registry[plugin.name] = plugin
  }

  initPlugins (): void {
    Object.values(this.registry).forEach(plugin => {
      plugin.onInit({ container })
    })
  }
}

export const pluginSystem = new PluginSystem()
