/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'

const LabelExtraContext = createContext<ReactNode | undefined>(undefined)

export interface LabelExtraProviderProps {
  extra: ReactNode
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
 */
export const LabelExtraProvider = ({ extra, children }: LabelExtraProviderProps): React.JSX.Element => (
  <LabelExtraContext.Provider value={ extra }>
    {children}
  </LabelExtraContext.Provider>
)

/** End-of-label slot, see LabelExtraProvider. Renders nothing outside a provider. */
export const LabelExtra = (): React.JSX.Element | null => {
  const extra = useContext(LabelExtraContext)

  if (extra === undefined || extra === null) {
    return null
  }

  return <>{extra}</>
}
