/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'

export interface PipelineLayoutContextProps {
  pipelineLayout: 'default' | 'verbose'
}

export const PipelineLayoutContext = createContext<PipelineLayoutContextProps>({
  pipelineLayout: 'default'
})

export interface PipelineLayoutProviderProps extends PipelineLayoutContextProps {
  children: React.ReactNode
}

export const PipelineLayoutProvider = ({ children, pipelineLayout }: PipelineLayoutProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <PipelineLayoutContext.Provider value={ { pipelineLayout } }>
      {children}
    </PipelineLayoutContext.Provider>
  ), [children, pipelineLayout])
}

export const usePipelineLayoutContext = (): PipelineLayoutContextProps => {
  const context = useContext(PipelineLayoutContext)

  if (context === undefined) {
    throw new Error('usePipelineLayoutContext must be used within a PipelineLayoutProvider')
  }

  return context
}
