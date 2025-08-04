/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface DialogConfig {
  id: string
  width?: number
  height?: number
  items: DialogConfigItem
  reloadOnClose?: boolean
}

export interface DialogConfigItem {
  type: 'tabpanel' | 'panel' | string
  title?: string
  items?: DialogConfigItem[]
  label?: string
  name?: string
}
