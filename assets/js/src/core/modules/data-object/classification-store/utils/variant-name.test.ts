/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { variantNameOf } from './variant-name'
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { declaredVariantsOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-slots'

describe('variantNameOf', () => {
  it.each([undefined, null, '', ' ', '\t '])('reads the name %p as no name', (name) => {
    expect(variantNameOf({ name } as unknown as ClassificationStoreVariantLayout)).toBe('')
  })

  it('declares no slot for a whitespace-only variant written through the API', () => {
    expect(declaredVariantsOf([{ name: ' ' }, { name: 'metric' }]).map(variantNameOf)).toEqual(['metric'])
  })
})
