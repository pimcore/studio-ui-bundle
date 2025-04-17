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

import React, { useEffect } from 'react'
import { useClassDefinitionSelection } from '../../context-layer/provider/use-class-definition-selection'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useTypeSelectOptional } from '@Pimcore/modules/element/components/type-select/provider/use-type-select-optional'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface ClassDefinitionSelectProps {
  nullable?: boolean
}

export const ClassDefinitionSelect = ({ nullable = false }: ClassDefinitionSelectProps): React.JSX.Element => {
  const { selectedClassDefinition, setSelectedClassDefinition, availableClassDefinitions, config } = useClassDefinitionSelection()
  const typeSelectionContext = useTypeSelectOptional()
  const { useDataQueryHelper } = useSettings()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useDataQueryHelper()
  const objectRegistry = useInjection<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])
  let isDisabled = false

  const isNullable = config.classRestriction === undefined && nullable

  const options: SelectProps['options'] = availableClassDefinitions.map((classDefinition) => ({
    value: classDefinition.id,
    label: classDefinition.name
  }))

  if (isNullable) {
    options.unshift({
      value: null,
      label: 'All classes'
    })
  }

  if (config.classRestriction !== undefined && !isNullable && selectedClassDefinition === undefined) {
    setSelectedClassDefinition(availableClassDefinitions[0])
  }

  const onChange = (value): void => {
    if (value === selectedClassDefinition?.id) {
      return
    }

    const newSelectedClassDefinition = availableClassDefinitions.find((classDefinition) => classDefinition.id === value)

    setPage(1)
    setDataLoadingState('initial')
    setSelectedClassDefinition(newSelectedClassDefinition)
  }

  if (typeSelectionContext !== undefined) {
    const { value } = typeSelectionContext
    const hasType = typeof value === 'string' && objectRegistry.hasDynamicType(value)

    if (hasType) {
      const dynType = objectRegistry.getDynamicType(value)
      isDisabled = !dynType.allowClassSelectionInSearch
    } else {
      isDisabled = true
    }
  }

  useEffect(() => {
    if (isDisabled) {
      setSelectedClassDefinition(undefined)
    }
  }, [isDisabled])

  return (
    <Select
      className='w-full'
      disabled={ isDisabled }
      minWidth={ 'normal' }
      onChange={ (value) => { onChange(value) } }
      options={ options }
      showSearch
      value={ isNullable ? selectedClassDefinition?.name ?? null : selectedClassDefinition?.name }
    />
  )
}
