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
