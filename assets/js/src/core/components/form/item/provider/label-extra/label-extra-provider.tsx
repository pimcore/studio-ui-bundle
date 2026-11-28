/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { isNil } from 'lodash'

const LabelExtraContext = createContext<ReactNode | undefined>(undefined)

export interface LabelExtraProviderProps {
  extra: ReactNode
  /**
   * Render the extra after the one of an outer provider instead of replacing it,
   * so independent features can each add to the same label row.
   */
  append?: boolean
  children: ReactNode
}

/**
 * Node the form items below render at the very end of their label row — after the
 * label itself and everything the item appends to it (locale suffix, tooltip icon,
 * required mark). Both label implementations render it: the Ant form item and the
 * virtual item of the keyed and numbered lists.
 *
 * The same node is rendered into every label, so it has to decide itself whether it
 * applies to the item at hand, e.g. by the item context.
 *
 * A nested provider replaces the extra of an outer one, unless it appends to it.
 */
export const LabelExtraProvider = ({ extra, append = false, children }: LabelExtraProviderProps): React.JSX.Element => {
  const outerExtra = useContext(LabelExtraContext)
  const value = useMemo(() => append && !isNil(outerExtra)
    ? <>{outerExtra}{extra}</>
    : extra, [append, outerExtra, extra])

  return (
    <LabelExtraContext.Provider value={ value }>
      {children}
    </LabelExtraContext.Provider>
  )
}

/** End-of-label slot, see LabelExtraProvider. Renders nothing outside a provider. */
export const LabelExtra = (): React.JSX.Element | null => {
  const extra = useContext(LabelExtraContext)

  if (isNil(extra)) {
    return null
  }

  return <>{extra}</>
}
