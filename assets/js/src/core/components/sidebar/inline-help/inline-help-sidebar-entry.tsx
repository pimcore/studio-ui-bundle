/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useInlineHelp } from './inline-help-provider'

export const InlineHelpSidebarEntry = (): React.JSX.Element => {
  const { component } = useInlineHelp()

  return (
    <>
      {component}
    </>
  )
}
