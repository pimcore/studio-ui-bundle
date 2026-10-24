/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import 'reflect-metadata'
import React from 'react'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { DynamicTypeBatchEditSystemBoolean } from './dynamic-type-batch-edit-system-boolean'
import { DynamicTypeBatchEditCheckbox } from '../checkbox/dynamic-type-batch-edit-checkbox'
import { DynamicTypeBatchEditRegistry } from '../../dynamic-type-batch-edit-registry'
import { DynamicTypeBatchEditSystemBooleanComponent } from '../../components/system-boolean/dynamic-type-batch-edit-system-boolean-component'
import { DynamicTypeBatchEditCheckboxComponent } from '../../components/checkbox/dynamic-type-batch-edit-checkbox-component'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeRegistryContext } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { ContainerContext } from '@Pimcore/app/depency-injection'

// The component modules pull in the whole component library; the types only create their elements here.
jest.mock('../../components/system-boolean/dynamic-type-batch-edit-system-boolean-component', () => ({ DynamicTypeBatchEditSystemBooleanComponent: () => null }))
jest.mock('../../components/checkbox/dynamic-type-batch-edit-checkbox-component', () => ({ DynamicTypeBatchEditCheckboxComponent: () => null }))

/**
 * Regression test for platform-version#622: the "published" column (type system.boolean, frontendType checkbox)
 * has to resolve to the Publish / Unpublish batch edit instead of the plain checkbox.
 */
describe('DynamicTypeBatchEditSystemBoolean', () => {
  const publishedColumn: any = { key: 'published', type: 'system.boolean', frontendType: 'checkbox' }

  const resolveComponentType = (batchEdit: any): unknown => {
    const registry = new DynamicTypeBatchEditRegistry()
    registry.registerDynamicType(new DynamicTypeBatchEditCheckbox())
    registry.registerDynamicType(new DynamicTypeBatchEditSystemBoolean())

    const container = new Container()
    container.bind('DynamicTypes/BatchEditRegistry').toConstantValue(registry)

    const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
      <ContainerContext.Provider value={ container }>
        <DynamicTypeRegistryContext.Provider value={ { serviceIds: ['DynamicTypes/BatchEditRegistry'] } }>
          {children}
        </DynamicTypeRegistryContext.Provider>
      </ContainerContext.Provider>
    )
    const { result } = renderHook(() => useDynamicTypeResolver(), { wrapper })
    const { ComponentRenderer } = result.current.getComponentRenderer({ target: 'BATCH_EDIT', dynamicTypeIds: [batchEdit.type, batchEdit.frontendType] })

    return (ComponentRenderer?.({ batchEdit }) as React.ReactElement | undefined)?.type
  }

  it('is chosen for the published column over the checkbox', () => {
    expect(resolveComponentType(publishedColumn)).toBe(DynamicTypeBatchEditSystemBooleanComponent)
  })

  it('keeps the checkbox for class checkbox fields', () => {
    expect(resolveComponentType({ key: 'active', type: 'dataobject.adapter', frontendType: 'checkbox' })).toBe(DynamicTypeBatchEditCheckboxComponent)
  })

  it('keeps the checkbox for any other system boolean', () => {
    expect(resolveComponentType({ key: 'locked', type: 'system.boolean', frontendType: 'checkbox' })).toBe(DynamicTypeBatchEditCheckboxComponent)
  })
})
