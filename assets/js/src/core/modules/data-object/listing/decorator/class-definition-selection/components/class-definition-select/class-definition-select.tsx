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

export const ClassDefinitionSelect = (): React.JSX.Element => {
  const { selectedClassDefinition, setSelectedClassDefinition, availableClassDefinitions } = useClassDefinitionSelection()
  const options: SelectProps['options'] = availableClassDefinitions.map((classDefinition) => ({
    value: classDefinition.id,
    label: classDefinition.name
  }))

  const onChange: SelectProps['onChange'] = (value) => {
    const selectedClassDefinition = availableClassDefinitions.find((classDefinition) => classDefinition.id === value)

    if (selectedClassDefinition !== undefined) {
      setSelectedClassDefinition(selectedClassDefinition)
    }
  }

  // @todo translation
  return (
    <Select
      onChange={ onChange }
      options={ options }
      placeholder="Select a class definition"
      value={ selectedClassDefinition }
    />
  )
}
