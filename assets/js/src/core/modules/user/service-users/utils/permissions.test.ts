/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { mergePermissions, splitPermissions } from './permissions'

const grouped = {
  default: [{ key: 'assets' }, { key: 'documents' }],
  bundles: [{ key: 'plugin_datahub_config' }]
}

describe('splitPermissions', () => {
  it('splits the granted permissions into default and bundle permissions', () => {
    expect(splitPermissions(['documents', 'plugin_datahub_config'], grouped)).toEqual({
      permissionsDefault: ['documents'],
      permissionsBundles: ['plugin_datahub_config']
    })
  })
})

describe('mergePermissions', () => {
  it('joins both groups into one permission list', () => {
    expect(mergePermissions({ permissionsDefault: ['assets'], permissionsBundles: ['plugin_datahub_config'] }))
      .toEqual(['assets', 'plugin_datahub_config'])
  })
})
