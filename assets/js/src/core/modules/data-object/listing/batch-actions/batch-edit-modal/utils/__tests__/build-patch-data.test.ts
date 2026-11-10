/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildPatchData } from '../build-patch-data'

/**
 * Regression test for PEES-1831 / studio-ui-bundle#3181: "published" is a system field that the
 * backend only accepts at the top level of a patch item, never inside editableData.
 */
describe('buildPatchData', () => {
  it('moves published to the top level and keeps class fields in editableData', () => {
    expect(buildPatchData({ published: true, name: 'Isetta' })).toEqual({
      published: true,
      editableData: { name: 'Isetta' }
    })
  })

  it('keeps published=false so unpublishing works', () => {
    expect(buildPatchData({ published: false })).toEqual({
      published: false,
      editableData: {}
    })
  })

  it('omits the published key when it is not part of the values', () => {
    expect(buildPatchData({ name: 'Isetta' })).toEqual({
      editableData: { name: 'Isetta' }
    })
  })

  it('rejects a non-boolean published value instead of coercing it', () => {
    expect(() => buildPatchData({ published: 'false' })).toThrow('published')
    expect(() => buildPatchData({ published: 1 })).toThrow('published')
  })

  it('does not mutate the given values', () => {
    const values = { published: true, name: 'Isetta' }
    buildPatchData(values)
    expect(values).toEqual({ published: true, name: 'Isetta' })
  })
})
