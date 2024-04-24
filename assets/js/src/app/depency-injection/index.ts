import { createDiInstance } from '@Pimcore/lib/dependency-injection'

export const {
  container,
  ContainerContext,
  ContainerProvider,
  useInjection,
  useMultiInjection,
  useOptionalInjection
} = createDiInstance()
