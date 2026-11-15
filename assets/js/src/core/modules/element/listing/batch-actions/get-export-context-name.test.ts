/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getExportContextName } from './get-export-context-name'

describe('getExportContextName', () => {
  it('returns the folder key of a top level folder', () => {
    expect(getExportContextName('/Brand Logos')).toBe('Brand Logos')
  })

  it('returns only the last segment of a nested path', () => {
    expect(getExportContextName('/Car Images/jaguar')).toBe('jaguar')
  })

  it('ignores a trailing slash', () => {
    expect(getExportContextName('/Car Images/')).toBe('Car Images')
  })

  it('names the tree root by its path', () => {
    expect(getExportContextName('/')).toBe('/')
  })

  it('returns undefined when the path is not known', () => {
    expect(getExportContextName(undefined)).toBeUndefined()
    expect(getExportContextName('')).toBeUndefined()
  })
})
