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

import { container } from '@Pimcore/app/depency-injection'
import { type Container } from 'inversify'

export interface lifeCycleEvents {
  onInit?: (config: { container: Container }) => void
  onStartup?: () => void
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
      if (plugin.onInit !== undefined) {
        plugin.onInit({ container })
      }
    })
  }

  startupPlugins (): void {
    Object.values(this.registry).forEach(plugin => {
      if (plugin.onStartup !== undefined) {
        console.log('start up')
        plugin.onStartup()
      }
    })
  }
}

export const pluginSystem = new PluginSystem()
