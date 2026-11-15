/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isArray, isUndefined } from 'lodash'
import { useItem } from '../../../item/provider/item/use-item'
import { useKeyedListContext } from '../provider/keyed-list/use-keyed-list-value'

/**
 * Commits `value` into `field` of the enclosing keyed-list once, via a real (non-initial)
 * `operations.update` call, instead of relying on the field's antd `Form.Item initialValue`.
 *
 * `Form.Item initialValue` IS registered in the keyed-list store on mount (KeyedFormItemControl
 * calls `operations.update(name, initialValue, true)`), but with `isInitialValue: true`
 * KeyedList also folds the value into its own baseline and skips the parent-form propagation —
 * so an untouched pre-selected/default value never reaches the outer form store and silently
 * disappears from the saved config. See pimcore/platform-version#296, fixed for the "Simple
 * Field" source field with this same idiom; this hook generalizes it so every dynamic-type
 * component with a defaulted field (e.g. a transformer's pre-selected mode) can use it — a
 * pipeline item added and left untouched must still save with a complete config.
 *
 * A field that already has a value — loaded from a saved config, or set by the user — is left
 * untouched, and `value === undefined` is a no-op (nothing committed, nothing cleared).
 * The value is read through `operations.getValue`, so the host does not re-render on every
 * change of the list.
 */
export const useCommitKeyedListDefault = (field: string, value: unknown): void => {
  const { name } = useItem()
  const { operations } = useKeyedListContext()

  useEffect(() => {
    const fieldPath = [...(isArray(name) ? name : [name]), field]

    if (isUndefined(operations.getValue(fieldPath)) && !isUndefined(value)) {
      operations.update(fieldPath, value, false)
    }
  }, [])
}
