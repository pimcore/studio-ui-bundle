/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Stand-ins for the SDK barrels. Importing the real ones from a test pulls the whole
 * application in, down to the untranspiled ESM of the upload components, so a test that
 * renders a component whose dependencies reach a barrel substitutes these instead:
 *
 *   jest.mock('@sdk/components', () => jest.requireActual('@test-utils/mocks/sdk-barrel-mock').sdkComponentsMock)
 */

import React from 'react'
import { Flex } from 'antd'

export const sdkComponentsMock = {
  Flex,
  CreatableSelect: () => null,
  IconButton: () => null,
  Modal: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  useStudioModal: () => ({ modal: {}, localModal: {} })
}

export const sdkModulesAppMock = {
  GeneralError: class GeneralError extends Error {},
  trackError: () => {}
}

export const sdkAppMock = {
  injectSliceWithState: (slice: unknown) => slice,
  useAppDispatch: () => () => {},
  useTranslation: () => ({ t: (key: string) => key })
}
