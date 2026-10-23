/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getClassificationStoreName, getKeyCombinedFieldNameParent } from './combined-field-name'

describe('getClassificationStoreName', () => {
  it('returns the store field name from a form path', () => {
    expect(getClassificationStoreName(['attributes'])).toBe('attributes')
  })

  it('returns the last segment of a nested form path', () => {
    expect(getClassificationStoreName(['block', 0, 'attributes'])).toBe('attributes')
  })

  it('returns a plain name as is', () => {
    expect(getClassificationStoreName('attributes')).toBe('attributes')
  })
})

describe('getKeyCombinedFieldNameParent', () => {
  // Regression for platform-version#577: the key id alone ("6") cannot be resolved by the backend
  it('addresses a key by store, group and key id', () => {
    const keyId = 6

    expect([...getKeyCombinedFieldNameParent('attributes', 2), keyId].join('.')).toBe('attributes.2.6')
  })
})
