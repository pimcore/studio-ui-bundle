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

import React from 'react'
import { useClassDefinitionSelection } from '../../context-layer/provider/use-class-definition-selection'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'

export const ClassDefinitionSelect = (): React.JSX.Element => {
  const { selectedClassDefinition, setSelectedClassDefinition, availableClassDefinitions } = useClassDefinitionSelection()
  const { useDataQueryHelper } = useSettings()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useDataQueryHelper()
  const options: SelectProps['options'] = availableClassDefinitions.map((classDefinition) => ({
    value: classDefinition.id,
    label: classDefinition.name
  })).filter((option) => option.value !== selectedClassDefinition?.id)

  const onChange: SelectProps['onChange'] = (value) => {
    const selectedClassDefinition = availableClassDefinitions.find((classDefinition) => classDefinition.id === value)

    if (selectedClassDefinition !== undefined) {
      setPage(1)
      setDataLoadingState('initial')
      setSelectedClassDefinition(selectedClassDefinition)
    }
  }

  // @todo translation
  return (
    <Select
      className='w-full'
      onChange={ onChange }
      options={ options }
      placeholder="Select a class definition"
      showSearch
      value={ selectedClassDefinition?.name }
    />
  )
}
