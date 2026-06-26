/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AnyFilterDescriptor, type FilterValues } from '../types'

export const composeQuery = <TContribution, TContext>(
  descriptors: ReadonlyArray<AnyFilterDescriptor<TContribution, TContext>>,
  values: FilterValues,
  context: TContext
): TContribution[] => {
  const contributions: TContribution[] = []

  for (const descriptor of descriptors) {
    if (descriptor.toQuery === undefined || !descriptor.isEnabled(context)) {
      continue
    }

    const value = descriptor.key in values ? values[descriptor.key] : descriptor.defaultValue
    const contribution = descriptor.toQuery(value, context)

    if (contribution !== undefined) {
      contributions.push(contribution)
    }
  }

  return contributions
}
