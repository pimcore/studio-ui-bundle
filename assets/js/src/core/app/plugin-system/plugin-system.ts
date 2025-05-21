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
import { init, loadRemote } from '@module-federation/enhanced/runtime'

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
    const remotes = window.pluginRemotes

    if (remotes === undefined) {
      return
    }

    const initConfig: Parameters<typeof init>[0] = {
      name: 'mf-test',
      remotes: []
    }
    for (const [name, url] of Object.entries(remotes)) {
      if (url !== undefined) {
        initConfig.remotes.push({
          name,
          entry: url,
          alias: name
        })
      }
    }

    init(initConfig)

    for (const remote of initConfig.remotes) {
      promises.push(loadRemote(remote.alias))
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
        if (plugin.name === undefined) {
          console.error('Plugin name is undefined', plugin)
          continue
        }

        if (this.registry[plugin.name] !== undefined) {
          console.error('Plugin already registered', plugin.name)
          continue
        }

        this.registerPlugin(plugin)
      }
    }
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
