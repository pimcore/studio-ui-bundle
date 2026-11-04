/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createContext, type HTMLAttributes } from 'react'

// MainTabTitle makes only the active main tab's label a menu button, also for custom titles without the `active` prop
export const ACTIVE_MAIN_TAB_LABEL = '.widget-manager-tab-title__label[aria-haspopup="menu"]'

/** Extra props for the icon and name of a tab title, e.g. to open the tab menu from the keyboard. */
export const TabTitleLabelContext = createContext<HTMLAttributes<HTMLSpanElement>>({})
