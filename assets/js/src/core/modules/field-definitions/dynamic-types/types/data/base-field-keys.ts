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
 * The members that belong to the encrypted field itself rather than to the delegate it wraps.
 * They are neither hoisted out of a stored delegate nor cleared when the delegate type changes.
 *
 * `indexed` is in here because it is the Classification Store key's own search index flag, held on
 * the key and not on whatever type renders its value: left out, switching the delegate type would
 * clear it, the save would omit it, and an excluded key would reopen as indexed.
 *
 * Kept apart from the dynamic types so a dialog can read it without loading the whole element SDK.
 */
export const BASE_FIELD_KEYS = new Set(['fieldtype', 'fieldType', 'datatype', 'name', 'title', 'tooltip', 'indexed'])
