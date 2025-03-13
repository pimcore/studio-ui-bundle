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

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useClassDefinitions } from '@Pimcore/modules/class-definition/hooks/use-class-definitions'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface UseAddObjectHookReturn {
  addObjectTreeContextMenuItem: () => ItemType
}

export const useAddObject = (): UseAddObjectHookReturn => {
  const { t } = useTranslation()
  const classDefinitions = useClassDefinitions()

  const getClassEntries = (): ItemType[] => {
    let classHirachy: ItemType[] = []

    const structuredClassDefinitions = [...classDefinitions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce<Record<string, ClassDefinitionListItem[]>>((acc, classDefinition) => {
      const groupName = _.isEmpty(classDefinition.group)
        ? 'undefined'
        : classDefinition.group

      if (acc[groupName] === undefined) {
        acc[groupName] = []
      }

      acc[groupName].push(classDefinition)

      return acc
    }, {})

    if (structuredClassDefinitions.undefined !== undefined) {
      classHirachy = structuredClassDefinitions.undefined.map(classDefinition => {
        return {
          label: classDefinition.name,
          key: 'add-object-' + classDefinition.id,
          icon: <Icon { ...classDefinition.icon } />,
          onClick: () => {
            console.log('Add object', classDefinition)
          }
        }
      })
    }

    for (const [group, classDefinitions] of Object.entries(structuredClassDefinitions)) {
      if (group !== 'undefined') {
        classHirachy.push({
          label: group,
          key: 'add-object-group-' + group,
          icon: <Icon value={ 'folder' } />,
          children: classDefinitions.map(classDefinition => {
            return {
              label: classDefinition.name,
              key: classDefinition.id,
              icon: <Icon { ...classDefinition.icon } />,
              onClick: () => {
                console.log('Add object', classDefinition)
              }
            }
          })
        })
      }
    }

    return classHirachy
  }

  const addObjectTreeContextMenuItem = (): ItemType => {
    return {
      label: t('data-object.tree.context-menu.add-object'),
      key: 'add-object',
      icon: <Icon value={ 'folder' } />,
      children: getClassEntries()
    }
  }

  return {
    addObjectTreeContextMenuItem
  }
}
