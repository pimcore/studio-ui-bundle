/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useEffect, useState } from 'react'
import { type TabNode } from 'flexlayout-react'

interface WidgetContentProps {
  node: TabNode
  children: ReactNode
}

/**
 * Gates the rendering of a widget's content on the visibility of its tab.
 *
 * flexlayout-react keeps the content of inactive tabs mounted (it only hides
 * them via CSS), so every opened editor stays fully mounted in the React tree
 * and DOM, together with its data subscriptions. For the main editor widgets we
 * instead unmount the content while the tab is not the active one, keeping the
 * memory footprint bounded by the active editor rather than by the number of
 * open tabs.
 *
 * This is safe with regard to unsaved changes: editor working state (drafts,
 * modified cells, properties, ...) lives in redux slices keyed by element id,
 * not in component state, so the content rehydrates from the store when the tab
 * becomes visible again.
 */
export const WidgetContent = ({ node, children }: WidgetContentProps): React.JSX.Element | null => {
  const [isVisible, setIsVisible] = useState<boolean>(() => node.isVisible())

  useEffect(() => {
    // Sync once on mount in case visibility changed before the listener was attached.
    setIsVisible(node.isVisible())

    node.setEventListener('visibility', (params: { visible: boolean }) => {
      setIsVisible(params.visible)
    })

    return () => {
      node.removeEventListener('visibility')
    }
  }, [node])

  if (!isVisible) {
    return null
  }

  return <>{children}</>
}
