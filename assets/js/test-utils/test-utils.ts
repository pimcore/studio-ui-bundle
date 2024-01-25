import * as testingLibrary from '@testing-library/react'
import { GlobalProvider } from '@Pimcore/modules/app/components/global-provider'
import { type ReactElement } from 'react'

const { render: oldRenderFn, ...testingLibaryProps } = testingLibrary

const render = (
  ui: ReactElement,
  options?: Omit<testingLibrary.RenderOptions, 'wrapper'>
) => oldRenderFn(ui, { wrapper: GlobalProvider, ...options }) /* eslint-disable-line @typescript-eslint/explicit-function-return-type */

export { testingLibaryProps }
export { render }
