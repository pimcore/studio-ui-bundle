/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import { type TypeSelectProps } from '../type-select'

export interface TypeSelectData extends Omit<TypeSelectProps, 'onChange'> {
  setValue: (value: string | null) => void
};

export type TypeSelectContextProps = TypeSelectData | undefined

export const TypeSelectContext = createContext<TypeSelectContextProps>(undefined)

export interface TypeSelectProviderProps extends Omit<TypeSelectProps, 'value' | 'onChange'> {
  children: React.ReactNode
  valueState?: ReturnType<typeof useState<string | null>>
}

export const TypeSelectProvider = (props: TypeSelectProviderProps): React.JSX.Element => {
  const { children, valueState, ...restProps } = props
  let [value, setValue] = useState<string | null>(props.initialValue ?? null)

  if (valueState !== undefined) {
    const [inferredValueState, setInferredValueState] = valueState
    value = inferredValueState as string | null
    setValue = setInferredValueState
  }

  return useMemo(() => (
    <TypeSelectContext.Provider value={ { ...restProps, value, setValue } }>
      { children }
    </TypeSelectContext.Provider>
  ), [props, children, value, setValue])
}
