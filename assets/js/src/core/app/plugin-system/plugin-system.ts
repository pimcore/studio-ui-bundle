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
import { getInstance, loadRemote, type registerRemotes } from '@module-federation/enhanced/runtime'

export interface ILifeCycleEvents {
  onInit?: (config: { container: Container }) => void
  onStartup?: (config: { moduleSystem: typeof moduleSystem }) => void
}

export interface IAbstractPlugin extends ILifeCycleEvents {
  name: string
  priority?: number
}

export class PluginSystem {
  private registry: Record<string, IAbstractPlugin> = {}

  async loadPlugins (): Promise<void> {
    const promises: any[] = []
    const remotes = window.pluginRemotes
    const alternativePaths = window.alternativePluginExportPaths

    if (remotes === undefined) {
      return
    }

    const remoteList: Parameters<typeof registerRemotes>[0] = []
    for (const [name, url] of Object.entries(remotes)) {
      if (url !== undefined) {
        remoteList.push({
          name,
          entry: url,
          alias: name
        })
      }
    }

    getInstance()?.registerRemotes(remoteList)

    for (const remote of remoteList) {
      const alternativeExport = alternativePaths?.[remote.name] ?? ''
      const moduleId = alternativeExport !== '' ? `${remote.alias}${alternativeExport}` : remote.alias!
      promises.push(loadRemote(moduleId))
    }

    const result = await Promise.allSettled(promises)

    for (const remoteResponse of result) {
      const isValidResponse = remoteResponse.status === 'fulfilled'

      if (!isValidResponse) {
        console.error('Error loading remote plugin', remoteResponse)
        continue
      }

      const plugins: Record<string, IAbstractPlugin> = remoteResponse.value

      for (const plugin of Object.values(plugins)) {
        if (typeof plugin !== 'object') {
          continue
        }

        if (plugin.name === undefined) {
          continue
        }

        if (this.registry[plugin.name] !== undefined) {
          console.error('Plugin already registered', plugin.name)
          continue
        }

        const finalPlugin = {
          priority: plugin.priority ?? 0,
          ...plugin
        }

        this.registerPlugin(finalPlugin)
      }
    }
  }

  registerPlugin (plugin: IAbstractPlugin): void {
    this.registry[plugin.name] = plugin
  }

  getOrderedPlugins (): IAbstractPlugin[] {
    return Object.values(this.registry).sort((a, b) => {
      return (a.priority ?? 0) - (b.priority ?? 0)
    })
  }

  initPlugins (): void {
    this.getOrderedPlugins().forEach(plugin => {
      if (plugin.onInit !== undefined) {
        plugin.onInit({ container })
      }
    })
  }

  startupPlugins (): void {
    this.getOrderedPlugins().forEach(plugin => {
      if (plugin.onStartup !== undefined) {
        plugin.onStartup({ moduleSystem })
      }
    })
  }
}

export const pluginSystem = new PluginSystem()
