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
import MissingContext from '@Pimcore/modules/element/editor/detached-tab/missing-context'
import DetachedTabContent from '@Pimcore/modules/element/editor/detached-tab/detached-tab-content'
import { useGlobalElementContext } from '@Pimcore/modules/element/hooks/use-global-element-context'

interface IDetachedTabProps {
  tabKey: string
}

export const DetachedTab = ({ tabKey }: IDetachedTabProps): React.JSX.Element => {
  const { context } = useGlobalElementContext()

  if (context === undefined) {
    return <MissingContext />
  }

  return (
    <DetachedTabContent
      context={ context }
      key={ context.type } // the key fixes the hook chain for different element types - TLDR; don't delete it!
      tabKey={ tabKey }
    />
  )
}
