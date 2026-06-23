/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { type AnyFilterDescriptor } from '../types'
import { type FiltersStore } from '@Pimcore/components/filters'

export interface FiltersRendererProps<TContext> {
  descriptors: ReadonlyArray<AnyFilterDescriptor<unknown, TContext>>
  context: TContext
  store: FiltersStore
  mode?: string
}

const renderFilterControl = <TContext,>(
  descriptor: AnyFilterDescriptor<unknown, TContext>,
  store: FiltersStore,
  context: TContext
): ReactNode => {
  const value = descriptor.key in store.values ? store.values[descriptor.key] : descriptor.defaultValue
  const handleChange = (next: unknown): void => {
    store.setValue(descriptor.key, next)
  }

  if (descriptor.renderSection !== undefined) {
    return descriptor.renderSection({ value, onChange: handleChange, context })
  }

  if (descriptor.Control !== undefined) {
    const Control = descriptor.Control
    return (
      <Control
        onChange={ handleChange }
        value={ value }
      />
    )
  }

  return null
}

export function FiltersRenderer<TContext> ({ descriptors, context, store, mode }: FiltersRendererProps<TContext>): React.JSX.Element {
  const visibleDescriptors = descriptors
    .filter((descriptor) => descriptor.isEnabled(context))
    .filter((descriptor) => mode === undefined || descriptor.mode === undefined || descriptor.mode === mode)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <>
      {visibleDescriptors.map((descriptor) => (
        <React.Fragment key={ descriptor.key }>
          {renderFilterControl(descriptor, store, context)}
        </React.Fragment>
      ))}
    </>
  )
}
