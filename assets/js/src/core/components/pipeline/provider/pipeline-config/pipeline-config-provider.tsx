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

export interface PipelineConfigProviderProps {
  initialConfig?: Record<string, any>
  children: React.ReactNode
}

export interface IPipelineConfigProviderContext {
  config: Record<string, any>
  setConfig: (config: Record<string, any>) => void
}

export const PipelineConfigProviderContext = createContext<IPipelineConfigProviderContext | undefined>(undefined)

export const PipelineConfigProvider = ({ initialConfig, children }: PipelineConfigProviderProps): React.JSX.Element => {
  const [config, setConfig] = useState<Record<string, any>>(initialConfig ?? {})

  return useMemo(() => (
    <PipelineConfigProviderContext.Provider value={ { config, setConfig } }>
      {children}
    </PipelineConfigProviderContext.Provider>
  ), [config, children])
}
