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
import { type ColorToken, defaultIconColorGroups } from './default-icon-color-groups'
import { isArray, isUndefined } from 'lodash'

export type IconColorGroupName = 'element' | 'fieldDefinition' | string
export type IconColorGroup = IconColorGroupName | IconColorGroupName[]

export type IconColorGroupDefinition = Record<string, ColorToken>

export interface IconColorGroupsRegistry {
  registerGroup: (groupName: IconColorGroupName, definitions: IconColorGroupDefinition) => void
  addToGroup: (groupName: IconColorGroupName, iconName: string, colorToken: ColorToken) => void
  getGroup: (groupName: IconColorGroupName) => IconColorGroupDefinition | undefined
  hasGroup: (groupName: IconColorGroupName) => boolean
  getIconColor: (groupName: IconColorGroupName, iconName: string) => ColorToken | undefined
  getIconColorValue: (groupName: IconColorGroup, iconName: string, token: Record<string, any>) => string | undefined
  getAllGroups: () => Record<string, IconColorGroupDefinition>
}

@injectable()
export class IconColorGroupsRegistryService implements IconColorGroupsRegistry {
  private readonly groups = new Map<string, IconColorGroupDefinition>(
    Object.entries(defaultIconColorGroups)
  )

  registerGroup (groupName: IconColorGroupName, definitions: IconColorGroupDefinition): void {
    this.groups.set(groupName, definitions)
  }

  addToGroup (groupName: IconColorGroupName, iconName: string, colorToken: ColorToken): void {
    const group = this.groups.get(groupName)

    if (isUndefined(group)) {
      this.groups.set(groupName, { [iconName]: colorToken })
    } else {
      group[iconName] = colorToken
    }
  }

  getGroup (groupName: IconColorGroupName): IconColorGroupDefinition | undefined {
    return this.groups.get(groupName)
  }

  hasGroup (groupName: IconColorGroupName): boolean {
    return this.groups.has(groupName)
  }

  getIconColor (groupName: IconColorGroupName, iconName: string): ColorToken | undefined {
    const group = this.getGroup(groupName)
    if (isUndefined(group)) {
      return undefined
    }

    return group[iconName]
  }

  getIconColorValue (groupName: IconColorGroup, iconName: string, token: Record<string, any>): string | undefined {
    if (isArray(groupName)) {
      for (const name of groupName) {
        const colorTokenKey = this.getIconColor(name, iconName)
        if (!isUndefined(colorTokenKey)) {
          return token[colorTokenKey]
        }
      }
      return undefined
    }

    const colorTokenKey = this.getIconColor(groupName, iconName)
    if (isUndefined(colorTokenKey)) {
      return undefined
    }

    return token[colorTokenKey]
  }

  getAllGroups (): Record<string, IconColorGroupDefinition> {
    return Object.fromEntries(this.groups)
  }
}
