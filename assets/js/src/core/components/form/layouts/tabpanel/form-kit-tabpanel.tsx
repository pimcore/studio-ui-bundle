/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Tabpanel, type TabpanelProps } from '@Pimcore/components/tabpanel/tabpanel'
import { ItemSpacer } from '@Pimcore/components/form/layouts/item-spacer/item-spacer'

/**
 * `FormKit.TabPanel` — the shared `Tabpanel` with each tab's content spaced by `ItemSpacer`, the
 * same 8px rhythm `FormKit.Panel` applies.
 *
 * FormKit sets antd's `itemMarginBottom` to 0 and expects the gap to come from a spacer, so fields
 * placed straight into a tab would otherwise render flush. The spacer lives here rather than in
 * `Tabpanel` itself because `Tabpanel` is public SDK API used outside FormKit (the GDPR extractor,
 * object layouts, third-party bundles), where antd's own item margin still applies and an extra gap
 * would be unsolicited.
 *
 * A tab holding a single child is unaffected either way — `gap` only applies between siblings — so
 * wrapping a tab in a `Panel` remains fine and does not double up.
 */
export const FormKitTabpanel = ({ items, ...props }: TabpanelProps): React.JSX.Element => {
  const spacedItems = useMemo(
    () => items.map((item) => ({
      ...item,
      children: <ItemSpacer>{item.children}</ItemSpacer>
    })),
    [items]
  )

  return (
    <Tabpanel
      { ...props }
      items={ spacedItems }
    />
  )
}
