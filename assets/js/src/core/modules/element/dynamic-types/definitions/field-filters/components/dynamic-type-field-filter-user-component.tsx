/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { UserSelect } from '@Pimcore/modules/user/components/user-select/user-select'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'

/**
 * Filter value: the ids of the selected users. The backend matches these against the user column
 * (userModification / userOwner), so an element is kept if it was modified/owned by any of them.
 */
export type UserFilterValue = number[]

export interface DynamicTypeFieldFilterUserProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterUserComponent = (
  props: DynamicTypeFieldFilterUserProps
): React.JSX.Element => {
  const { data, setData } = useDynamicFilter()
  const [value, setValue] = useState<UserFilterValue>((data as UserFilterValue) ?? [])

  useEffect(() => {
    setValue((data as UserFilterValue) ?? [])
  }, [data])

  const handleChange = (newValue: UserFilterValue): void => {
    setValue(newValue)
    setData(newValue)
  }

  return (
    <UserSelect
      mode="multiple"
      onChange={ (newValue) => { handleChange(newValue as UserFilterValue) } }
      showSearch
      style={ { width: '100%' } }
      value={ value }
    />
  )
}
