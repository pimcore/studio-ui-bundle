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
 * A single selectable leaf in the column picker.
 *
 * The component is intentionally agnostic about what a "column" is: `meta`
 * carries an opaque payload that is handed back verbatim to `onSelect`, so the
 * consumer can map it back to its own domain model (e.g. an `AvailableColumn`).
 */
export interface ColumnPickerItem<TMeta = unknown> {
  key: string
  label: string
  disabled?: boolean
  meta?: TMeta
}

/**
 * A (potentially nested) group of selectable items, rendered as a collapsible
 * category. `children` allows arbitrary nesting to mirror grouped field paths.
 */
export interface ColumnPickerGroup<TMeta = unknown> {
  key: string
  label: string
  items: Array<ColumnPickerItem<TMeta>>
  children?: Array<ColumnPickerGroup<TMeta>>
}

export type OnColumnPickerSelect<TMeta = unknown> = (item: ColumnPickerItem<TMeta>) => void
