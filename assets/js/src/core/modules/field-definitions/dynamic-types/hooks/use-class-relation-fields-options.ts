/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import {
  useClassDefinitionGetLayoutByIdQuery,
  useClassGetSelectedVisibleFieldsQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'

export const useClassRelationFieldsOptions = (classId: string | undefined): Array<{ label: string, value: string }> => {
  const { data } = useClassDefinitionGetLayoutByIdQuery({ id: classId ?? '' }, { skip: typeof classId !== 'string' || classId.length === 0 })

  return useMemo(() => {
    if (data?.layoutDefinition === undefined || data.layoutDefinition === null) {
      return []
    }

    const options: Array<{ label: string, value: string }> = []

    const walk = (node: any): void => {
      const fieldtype = node.fieldtype as string | undefined
      if (typeof fieldtype === 'string' && [
        'manyToOneRelation',
        'manyToManyRelation',
        'manyToManyObjectRelation',
        'advancedManyToManyRelation',
        'advancedManyToManyObjectRelation'
      ].includes(fieldtype)) {
        const title = (node.title as string | undefined) ?? (node.name as string | undefined) ?? ''
        const name = (node.name as string | undefined) ?? ''
        if (name.length > 0) {
          options.push({
            label: `${title} (${fieldtype})`,
            value: name
          })
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(walk)
      }
    }

    walk(data.layoutDefinition)

    return options
  }, [data])
}

export const useClassVisibleFieldsOptions = (classId: string | undefined, relationField: string | undefined): Array<{ label: string, value: string }> => {
  const { getById } = useClassDefinitions()
  const className = useMemo(() => (typeof classId === 'string' ? getById(classId)?.name : undefined), [classId, getById])

  const { data } = useClassGetSelectedVisibleFieldsQuery(
    { id: className ?? '', relationField: relationField ?? '' },
    { skip: typeof className !== 'string' || className.length === 0 || typeof relationField !== 'string' || relationField.length === 0 }
  )

  return useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])
}
