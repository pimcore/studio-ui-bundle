/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import * as testingLibrary from '@testing-library/react'
import { GlobalProvider } from '@Pimcore/modules/app/global-provider'
import { type ReactElement } from 'react'

const { render: oldRenderFn, ...testingLibaryProps } = testingLibrary

const render = (
  ui: ReactElement,
  options?: Omit<testingLibrary.RenderOptions, 'wrapper'>
) => oldRenderFn(ui, { wrapper: GlobalProvider, ...options }) /* eslint-disable-line @typescript-eslint/explicit-function-return-type */

export { testingLibaryProps }
export { render }
