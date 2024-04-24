import 'reflect-metadata'
import React, { useContext, createContext } from 'react'
import { Container } from 'inversify'

interface DiInstance {
  container: Container
  ContainerContext: React.Context<Container>
  ContainerProvider: React.FC<{ children: React.ReactNode }>
  useInjection: <T>(identifier: symbol) => T
  useOptionalInjection: <T>(identifier: symbol) => T | null
  useMultiInjection: <T>(identifier: symbol) => T[]
};

export function createDiInstance (): DiInstance {
  const container = new Container()
  const ContainerContext = createContext(container)

  const ContainerProvider = ({ children }: { children: React.JSX.Element }): React.JSX.Element => {
    return <ContainerContext.Provider value={ container }>{children}</ContainerContext.Provider>
  }

  const useInjection = function<T>(identifier: symbol): T {
    const container = useContext(ContainerContext)
    return container.get<T>(identifier)
  }

  const useOptionalInjection = function<T>(identifier: symbol): T | null {
    const container = useContext(ContainerContext)
    return container.isBound(identifier) ? container.get<T>(identifier) : null
  }

  const useMultiInjection = function<T>(identifier: symbol): T[] {
    const container = useContext(ContainerContext)
    return container.getAll<T>(identifier)
  }

  return {
    container,
    ContainerContext,
    ContainerProvider,
    useInjection,
    useOptionalInjection,
    useMultiInjection
  }
};
