import React, { useContext, createContext } from 'react'
import { Container } from 'inversify'

export interface IReadonlyContainer {
  get: Container['get']
  getAll: Container['getAll']
}

interface DiInstance {
  container: Container
  readonlyContainer: IReadonlyContainer
  ContainerContext: React.Context<Container>
  ContainerProvider: React.FC<{ children: React.ReactNode }>
  useInjection: <T>(identifier: symbol) => T
  useOptionalInjection: <T>(identifier: symbol) => T | null
  useMultiInjection: <T>(identifier: symbol) => T[]
};

export function createDiInstance (): DiInstance {
  const container = new Container()
  const ContainerContext = createContext(container)
  const readonlyContainer: IReadonlyContainer = {
    get: container.get,
    getAll: container.getAll
  }

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
    readonlyContainer,
    ContainerContext,
    ContainerProvider,
    useInjection,
    useOptionalInjection,
    useMultiInjection
  }
};
