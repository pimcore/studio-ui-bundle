import { createDiInstance } from '@Pimcore/lib/dependency-injection'

export const {
  container,
  readonlyContainer,
  ContainerContext,
  ContainerProvider,
  useInjection,
  useMultiInjection,
  useOptionalInjection
} = createDiInstance()
