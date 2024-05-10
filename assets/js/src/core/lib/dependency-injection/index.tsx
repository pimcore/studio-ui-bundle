/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
  const ContainerContext = createContext(container)

  const ContainerProvider = ({ children }: { children: React.JSX.Element }): React.JSX.Element => {
    return <ContainerContext.Provider value={ container }>{children}</ContainerContext.Provider>
  }

  const useInjection = function<T>(identifier: string): T {
    const container = window.Pimcore.container
    return container.get<T>(identifier)
  }

  const useOptionalInjection = function<T>(identifier: string): T | null {
    const container = window.Pimcore.container
    return container.isBound(identifier) ? container.get<T>(identifier) : null
  }

  const useMultiInjection = function<T>(identifier: string): T[] {
    const container = window.Pimcore.container
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
