/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { type Container } from 'inversify'
import { moduleSystem } from '../module-system/module-system'

export interface ILifeCycleEvents {
  onInit?: (config: { container: Container }) => void
  onStartup?: (config: { moduleSystem: typeof moduleSystem }) => void
}

export interface IAbstractPlugin extends ILifeCycleEvents {
  name: string
}

export class PluginSystem {
  private registry: Record<string, IAbstractPlugin> = {}

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

    await Promise.allSettled(promises)
  }

  registerPlugin (plugin: IAbstractPlugin): void {
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
        plugin.onStartup({ moduleSystem })
      }
    })
  }
}

export const pluginSystem = new PluginSystem()
