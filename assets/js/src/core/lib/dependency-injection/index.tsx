/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext } from 'react'
import { Container } from 'inversify'

interface DiInstance {
  container: Container
  ContainerContext: React.Context<Container>
  ContainerProvider: React.FC<{ children: React.ReactNode, container?: Container }>
  useInjection: <T>(identifier: string) => T
  useOptionalInjection: <T>(identifier: string) => T | null
  useMultiInjection: <T>(identifier: string) => T[]
};

// SPIKE S-A: make the container injectable.
// - createDiInstance() with no arg keeps the existing (admin) behaviour: use or
//   lazily create the global window.Pimcore.container. Admin call sites unchanged.
// - An external host can pass its own isolated Container, or inject one per-subtree
//   via <ContainerProvider container={...}>.
// - The hooks now resolve from ContainerContext (default = the root container)
//   instead of a closed-over global, so injection works with ONE central change.
export function createDiInstance (providedContainer?: Container): DiInstance {
  let rootContainer: Container
  if (providedContainer !== undefined) {
    rootContainer = providedContainer
  } else {
    if (window.Pimcore?.container === undefined) {
      window.Pimcore = window.Pimcore ?? {}
      window.Pimcore.container = new Container()
    }
    rootContainer = window.Pimcore.container
  }

  const ContainerContext = createContext(rootContainer)

  const ContainerProvider = ({ children, container }: { children: React.ReactNode, container?: Container }): React.JSX.Element => {
    return <ContainerContext.Provider value={ container ?? rootContainer }>{children}</ContainerContext.Provider>
  }

  const useInjection = function<T>(identifier: string): T {
    return useContext(ContainerContext).get<T>(identifier)
  }

  const useOptionalInjection = function<T>(identifier: string): T | null {
    const container = useContext(ContainerContext)
    return container.isBound(identifier) ? container.get<T>(identifier) : null
  }

  const useMultiInjection = function<T>(identifier: string): T[] {
    return useContext(ContainerContext).getAll<T>(identifier)
  }

  return {
    container: rootContainer,
    ContainerContext,
    ContainerProvider,
    useInjection,
    useOptionalInjection,
    useMultiInjection
  }
};
