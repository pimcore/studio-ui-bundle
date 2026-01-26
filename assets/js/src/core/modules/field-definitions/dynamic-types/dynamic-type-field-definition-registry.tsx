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
import { TreeDataItem } from '@sdk/components'
import { DynamicTypeRegistryAbstract } from '@sdk/modules/element'
import { ElementIcon } from '@sdk/modules/widget-manager'
import { injectable } from 'inversify'

export interface GroupInfo {
  icon: ElementIcon
}

@injectable()
export class DynamicTypeFieldDefinitionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeFieldDefinitionAbstract> {
  getTypesByTags (tags: string[], context: FieldDefinitionContext): DynamicTypeFieldDefinitionAbstract[] {
    return this.getDynamicTypes().filter((type) => {
      const typeTags = type.getTags(context)
      return tags.some(tag => typeTags.includes(tag))
    })
  }

  getDropdownGroupInfos(): Record<string, GroupInfo> {
    return {
      'layout': { 
        icon: {
          value: 'new-layout',
          type: 'name'
        }
       },
       'data': { 
        icon: {
          value: 'new-data-component',
          type: 'name'
        }
       },
      'data/text': { 
        icon: {
          value: 'content',
          type: 'name'
        }
       },
       'data/number': { 
        icon: {
          value: 'number-type',
          type: 'name'
        }
       },
       'data/date': { 
        icon: {
          value: 'date',
          type: 'name'
        }
       },
       'data/select': { 
        icon: {
          value: 'select-type',
          type: 'name'
        }
       },
       'data/media': { 
        icon: {
          value: 'media',
          type: 'name'
        }
       },
       'data/relation': { 
        icon: {
          value: 'relation',
          type: 'name'
        }
      },
       'data/geographic': { 
        icon: {
          value: 'location-marker',
          type: 'name'
        }
      },
      'data/crm': { 
        icon: {
          value: 'crm',
          type: 'name'
        }
      },
       'data/structured': { 
        icon: {
          value: 'batch-selection',
          type: 'name'
        }
      },
      'data/other': { 
        icon: {
          value: 'other',
          type: 'name'
        }
      },
       
    }
  }

  private optimizeActions(actions: TreeDataItem['actions']): TreeDataItem['actions'] {
    if (!actions) {
      return actions
    }

    const optimizedActions: NonNullable<TreeDataItem['actions']> = []

    actions.forEach((action) => {
      if (action.actions && action.actions.length > 0) {
        action.actions = this.optimizeActions(action.actions)
      }

      if (action.actions && action.actions.length === 1) {
        optimizedActions.push(action.actions[0])
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

  getDropdownActions(context: FieldDefinitionContext): TreeDataItem['actions'] {
    const { fieldDefinitions, path, area } = context;
    const fieldDefinition = fieldDefinitions[path.at(-1)!];
    // @todo remove wrong type of fieldType when backend provides the right typo
    const dynType = this.getDynamicType(fieldDefinition.fieldType ?? fieldDefinition.fieldtype, false);

    if (dynType === undefined) {
      return [];
    }

    const groupInfos = this.getDropdownGroupInfos();
    const isCloneAllowed = !area.includes('custom-layout');
    const isRoot = fieldDefinition.name === 'pimcore_root';
    const allowedDropdownTags = isRoot ? ['group:root'] : dynType.getValidDropdownTags(context);

    const typesByTags = this.getTypesByTags(allowedDropdownTags, context);

    let actions: TreeDataItem['actions'] = [];
    const groupedTypes: Record<string, DynamicTypeFieldDefinitionAbstract[]> = {};

    typesByTags.forEach((type) => {
      const groups = type.getGroup();
      const groupKey = groups.join('/');

      if (!groupedTypes[groupKey]) {
        groupedTypes[groupKey] = [];
      }

      groupedTypes[groupKey].push(type);
    });

    for (const groupPath in groupedTypes) {
      const groupParts = groupPath.split('/');
      let currentActions = actions;
      let currentGroupPath = '';

      groupParts.forEach((group, index) => {
        currentGroupPath = index === 0 ? group : `${currentGroupPath}/${group}`;
        let action = currentActions.find(a => a.key === `group-${group}`);

        if (!action) {
          action = {
            key: `group-${group}`,
            icon: groupInfos[currentGroupPath]?.icon.value ?? '',
            iconColorGroup: ['fieldDefinition_group_' + group, 'fieldDefinition'],
            actions: []
          };
          currentActions.push(action);
        }

        if (index === groupParts.length - 1) {
          // Last part, add types here
          groupedTypes[groupPath].forEach((type) => {
            action!.actions!.push({
              key: `add-${type.id}`,
              icon: type.getIcon().value,
              iconColorGroup: ['fieldDefinition_' + type.id, 'fieldDefinition']
            });
          });
        } else {
          // Move deeper into the nested structure
          currentActions = action.actions!;
        }
      });
    }

    actions = this.optimizeActions(actions) ?? [];

    if (!isRoot) {
      if (isCloneAllowed) {
        actions.push({
          key: 'clone',
          icon: 'content-duplicate',
        });
      }

      actions.push({
        key: 'delete',
        icon: 'trash',
      });
    }

    return actions;
  }
}
