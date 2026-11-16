/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { omit } from 'lodash'

const WRAPPER_OWN_MEMBERS = ['delegateDatatype', 'delegate', 'variants', 'multiValue', 'maximum']

/**
 * The definition a `multiValue` key's delegate type is built from: the wrapper's own members are
 * stripped, the type is the delegate's and the delegate's own settings (under `delegate`) are spread
 * over it — the same shape the editor and batch edit give the delegate's widget.
 */
export const delegateDefinitionOf = <T extends object>(definition: T): Record<string, unknown> => {
  const { delegateDatatype, delegate } = definition as { delegateDatatype?: string | null, delegate?: Record<string, unknown> | null }

  return {
    ...omit(definition, WRAPPER_OWN_MEMBERS),
    fieldtype: delegateDatatype,
    ...('fieldType' in definition ? { fieldType: delegateDatatype } : {}),
    ...delegate
  }
}
