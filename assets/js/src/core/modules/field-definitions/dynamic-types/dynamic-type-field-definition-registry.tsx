/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DynamicTypeFieldDefinitionAbstract, type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { type TreeDataItem } from '@sdk/components'
import { DynamicTypeRegistryAbstract } from '@sdk/modules/element'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { injectable } from 'inversify'
import { isNil, kebabCase, uniq } from 'lodash'

export interface GroupInfo {
  icon: ElementIcon
  translationKey: string
}

@injectable()
export class DynamicTypeFieldDefinitionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeFieldDefinitionAbstract> {
  getTypesByTags (tags: string[], context: FieldDefinitionContext): DynamicTypeFieldDefinitionAbstract[] {
    return this.getDynamicTypes().filter((type) => {
      const typeTags = type.getTags(context)
      return tags.some(tag => typeTags.includes(tag))
    })
  }

  resolveTags (tags: string[], context: FieldDefinitionContext): string[] {
    const types = this.getTypesByTags(tags, context)
    return uniq(types.map(type => type.id))
  }

  getDropdownGroupInfos (): Record<string, GroupInfo> {
    return {
      layout: {
        icon: {
          value: 'new-layout',
          type: 'name'
        },
        translationKey: 'field-definition.groups.layout'
      },
      data: {
        icon: {
          value: 'new-data-component',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data'
      },
      'data/text': {
        icon: {
          value: 'content',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.text'
      },
      'data/numeric': {
        icon: {
          value: 'number-type',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.numeric'
      },
      'data/date': {
        icon: {
          value: 'date',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.date'
      },
      'data/select': {
        icon: {
          value: 'select-type',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.select'
      },
      'data/media': {
        icon: {
          value: 'media',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.media'
      },
      'data/relation': {
        icon: {
          value: 'relation',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.relation'
      },
      'data/geo': {
        icon: {
          value: 'location-marker',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.geographic'
      },
      'data/crm': {
        icon: {
          value: 'crm',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.crm'
      },
      'data/structured': {
        icon: {
          value: 'batch-selection',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.structured'
      },
      'data/other': {
        icon: {
          value: 'other',
          type: 'name'
        },
        translationKey: 'field-definition.groups.data.other'
      }

    }
  }

  protected buildGroupedActions (
    types: DynamicTypeFieldDefinitionAbstract[],
    actionKeyPrefix: string
  ): TreeDataItem['actions'] {
    const groupInfos = this.getDropdownGroupInfos()
    const actions: TreeDataItem['actions'] = []
    const groupedTypes: Record<string, DynamicTypeFieldDefinitionAbstract[]> = {}

    types.forEach((type) => {
      const groups = type.getGroup()
      const groupKey = groups.join('/')

      if (isNil(groupedTypes[groupKey])) {
        groupedTypes[groupKey] = []
      }

      groupedTypes[groupKey].push(type)
    })

    for (const groupPath in groupedTypes) {
      const groupParts = groupPath.split('/')
      let currentActions = actions
      let currentGroupPath = ''

      groupParts.forEach((group, index) => {
        currentGroupPath = index === 0 ? group : `${currentGroupPath}/${group}`
        const groupKey = `group-${group}`
        const groupMenuKey = `${actionKeyPrefix}group-${group}`
        const isRootLevel = currentActions === actions
        let action = currentActions.find(a => a.key === groupKey)

        if (isNil(action)) {
          const baseTranslationKey = groupInfos[currentGroupPath]?.translationKey
          const shouldAddPrefix = isRootLevel && baseTranslationKey !== undefined && actionKeyPrefix !== 'convert-'
          const groupTranslationKey = shouldAddPrefix
            ? `${baseTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
            : baseTranslationKey

          action = {
            key: groupKey,
            menuKey: groupMenuKey,
            icon: groupInfos[currentGroupPath]?.icon.value ?? '',
            iconColorGroup: ['fieldDefinition_group_' + group, 'fieldDefinition'],
            translationKey: groupTranslationKey,
            actions: []
          }
          currentActions.push(action)
        }

        if (index === groupParts.length - 1) {
          groupedTypes[groupPath].forEach((type) => {
            const isTypeAtRoot = action.actions!.length === 0 && isRootLevel
            const baseTypeTranslationKey = `field-definition.${kebabCase(type.id)}`
            const shouldAddTypePrefix = isTypeAtRoot && actionKeyPrefix !== 'convert-'
            const typeTranslationKey = shouldAddTypePrefix
              ? `${baseTypeTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
              : baseTypeTranslationKey

            action.actions!.push({
              key: `${actionKeyPrefix}${type.id}`,
              icon: type.getIcon().value,
              iconColorGroup: ['fieldDefinition_' + type.id, 'fieldDefinition'],
              translationKey: typeTranslationKey
            })
          })
        } else {
          currentActions = action.actions!
        }
      })
    }

    return this.optimizeActions(actions, actionKeyPrefix, true) ?? []
  }

  protected optimizeActions (actions: TreeDataItem['actions'], actionKeyPrefix: string, isRootLevel: boolean = false): TreeDataItem['actions'] {
    if (isNil(actions)) {
      return actions
    }

    if (actions.length === 1 && !isNil(actions[0].actions) && actions[0].actions.length > 0) {
      const promotedActions = this.optimizeActions(actions[0].actions, actionKeyPrefix, isRootLevel)
      // Add prefix only to items being promoted to the absolute root level (and not for convert)
      if (isRootLevel && actionKeyPrefix !== 'convert-') {
        return promotedActions?.map(action => {
          if (action.translationKey !== undefined && !action.translationKey.includes('.with-prefix.')) {
            return {
              ...action,
              translationKey: `${action.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
            }
          }
          return action
        })
      }
      return promotedActions
    }

    const optimizedActions: NonNullable<TreeDataItem['actions']> = []

    actions.forEach((action) => {
      if (!isNil(action.actions) && action.actions.length > 0) {
        action.actions = this.optimizeActions(action.actions, actionKeyPrefix, false)
      }

      if (!isNil(action.actions) && action.actions.length === 1) {
        const childAction = action.actions[0]
        // Add prefix only when promoting to root level (and not for convert)
        if (isRootLevel && actionKeyPrefix !== 'convert-' && childAction.translationKey !== undefined && !childAction.translationKey.includes('.with-prefix.')) {
          childAction.translationKey = `${childAction.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
        }
        optimizedActions.push(childAction)
      } else {
        optimizedActions.push(action)
      }
    })

    return optimizedActions.sort((a, b) => {
      const aHasChildren = (a.actions?.length ?? 0) > 0
      const bHasChildren = (b.actions?.length ?? 0) > 0

      if (aHasChildren === bHasChildren) {
        return 0
      }

      return aHasChildren ? -1 : 1
    })
  }

  getDropdownActions (context: FieldDefinitionContext): TreeDataItem['actions'] {
    const { fieldDefinitions, path, area } = context
    const fieldDefinition = fieldDefinitions[path.at(-1)!]
    // @todo remove wrong type of fieldType when backend provides the right typo
    const dynType = this.getDynamicType((fieldDefinition.fieldType ?? fieldDefinition.fieldtype) as string, false)

    if (dynType === undefined) {
      return []
    }

    const isCustomLayout = area.includes('custom-layout')
    const isRoot = fieldDefinition.name === 'pimcore_root'
    const allowedDropdownTags = isRoot ? ['group:root'] : dynType.getValidDropdownTags(context)

    const dropdownTagTypes = this.getTypesByTags(allowedDropdownTags, context)
    const actions = this.buildGroupedActions(dropdownTagTypes, 'add-')

    if (!isRoot) {
      if (!isCustomLayout) {
        const convertibleTagTypes = this.getTypesByTags(dynType.getValidConvertibleTags(context), context)
        const convertibleActions = this.buildGroupedActions(convertibleTagTypes, 'convert-')

        if ((convertibleActions?.length ?? 0) > 0) {
          actions?.push({
            key: 'convert',
            icon: 'convert',
            translationKey: 'tree.actions.convert',
            actions: convertibleActions
          })
        }

        actions?.push({
          key: 'clone',
          icon: 'content-duplicate',
          translationKey: 'tree.actions.clone'
        })
      }
    }

    return actions ?? []
  }
}
