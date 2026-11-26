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

/**
 * The real one resolves its icon through the dependency-injection container. This stand-in keeps
 * the parts a test addresses it by — the accessible label, the disabled state and the click — so
 * controls built from it, such as the pagination's page buttons, stay reachable.
 */
const IconButtonMock = ({ 'aria-label': label, disabled, onClick }: {
  'aria-label'?: string
  disabled?: boolean
  onClick?: () => void
}): React.JSX.Element => (
  <button
    aria-label={ label }
    disabled={ disabled }
    onClick={ onClick }
    type="button"
  />
)

export const sdkComponentsMock = {
  Flex,
  CreatableSelect: () => null,
  IconButton: IconButtonMock,
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
