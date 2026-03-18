/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Block } from '@Pimcore/components/block/block'
import { Form } from '@Pimcore/components/form/form'
import { Select } from '@Pimcore/components/select/select'
import { FormKit } from '@sdk/components'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import {
  useClassDefinitionGetBricksUsagesQuery,
  useClassObjectBrickClassesQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface FieldnameSelectProps {
  blockIndex: number
  // Injected by NumberedFormItemControl — must be forwarded to inner <Select>
  value?: string | null
  onChange?: (value: string | null) => void
}

// Per-row fieldname select: reads classname from the NumberedList's internal
// state via operations.getValue (Form.useWatch reads the Ant Design form store
// which does NOT contain values managed by NumberedList's own useState).
const FieldnameSelect = ({ blockIndex, value, onChange }: FieldnameSelectProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { operations } = useNumberedList()
  const classname = operations.getValue(['classDefinitions', blockIndex, 'classname']) as string | undefined
  const prevClassnameRef = useRef(classname)

  useEffect(() => {
    if (prevClassnameRef.current !== undefined && prevClassnameRef.current !== classname) {
      onChange?.(null)
    }
    prevClassnameRef.current = classname
  }, [classname])

  const { data, isFetching } = useClassDefinitionGetBricksUsagesQuery(
    { id: classname! },
    { skip: classname === undefined || classname === '' }
  )

  const options = useMemo(() => {
    if (data?.items === undefined) return []
    const seen = new Set<string>()
    return data.items.reduce<Array<{ label: string, value: string }>>((acc, item) => {
      if (!seen.has(item.fieldName)) {
        seen.add(item.fieldName)
        acc.push({ label: item.fieldName, value: item.fieldName })
      }
      return acc
    }, [])
  }, [data])

  return (
    <Select
      disabled={ classname === undefined || classname === '' }
      loadingSkeleton={ isFetching }
      onChange={ onChange }
      options={ options }
      placeholder={ t('object-brick.class-definitions-block.select-fieldname') }
      value={ value }
    />
  )
}

export const ObjectBrickClassDefinitionsBlock = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { data: classesData, isFetching: isClassesFetching } = useClassObjectBrickClassesQuery()

  const classOptions = useMemo(() => {
    if (classesData?.items === undefined) return []
    return classesData.items.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }, [classesData])

  // Map class id -> name for the block item title
  const classNameById = useMemo(() => {
    const map: Record<string, string> = {}
    classesData?.items?.forEach((item) => { map[item.id] = item.name })
    return map
  }, [classesData])

  return (
    <Form.Item name="classDefinitions">
      <Block
        getItemTitle={ (item) => (item?.classname !== undefined ? classNameById[item.classname] ?? item.classname : t('object-brick.class-definitions-block.new-entry')) }
        title={ t('object-brick.class-definitions-block.title') }
      >
        { ({ blockIndex }) => (
          <FormKit.Panel>
            <Form.Item
              label={ t('object-brick.class-definitions-block.classname') }
              name="classname"
            >
              <Select
                loadingSkeleton={ isClassesFetching }
                options={ classOptions }
                placeholder={ t('object-brick.class-definitions-block.select-classname') }
                showSearch
              />
            </Form.Item>

            <Form.Item
              label={ t('object-brick.class-definitions-block.fieldname') }
              name="fieldname"
            >
              <FieldnameSelect blockIndex={ blockIndex } />
            </Form.Item>
          </FormKit.Panel>
        ) }
      </Block>
    </Form.Item>
  )
}
