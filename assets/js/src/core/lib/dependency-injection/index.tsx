/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext } from 'react'
import { Container } from 'inversify'

interface DiInstance {
  container: Container
  ContainerContext: React.Context<Container>
  ContainerProvider: React.FC<{ children: React.ReactNode }>
  useInjection: <T>(identifier: string) => T
  useOptionalInjection: <T>(identifier: string) => T | null
  useMultiInjection: <T>(identifier: string) => T[]
};

export function createDiInstance (): DiInstance {
  const container = new Container()

  if (window.Pimcore?.container === undefined) {
    window.Pimcore = window.Pimcore ?? {}
    window.Pimcore.container = container
  }

  const currentContainer = window.Pimcore.container
  const ContainerContext = createContext(currentContainer)

  const ContainerProvider = ({ children }: { children: React.JSX.Element }): React.JSX.Element => {
    return <ContainerContext.Provider value={ currentContainer }>{children}</ContainerContext.Provider>
  }

  const useInjection = function<T>(identifier: string): T {
    const container = currentContainer
    return container.get<T>(identifier)
  }

  const useOptionalInjection = function<T>(identifier: string): T | null {
    const container = currentContainer
    return container.isBound(identifier) ? container.get<T>(identifier) : null
  }

  const useMultiInjection = function<T>(identifier: string): T[] {
    const container = currentContainer
    return container.getAll<T>(identifier)
  }

  return {
    container: currentContainer,
    ContainerContext,
    ContainerProvider,
    useInjection,
    useOptionalInjection,
    useMultiInjection
  }
};
