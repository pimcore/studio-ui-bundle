/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { mergePermissions, splitPermissions, unlistedPermissions } from './permissions'

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

describe('unlistedPermissions', () => {
  it('keeps the granted permissions that neither group lists', () => {
    expect(unlistedPermissions(['assets', 'plugin_disabled_bundle', 'plugin_datahub_config'], grouped))
      .toEqual(['plugin_disabled_bundle'])
  })

  // A permission of a disabled bundle is not in the available list, so the form
  // cannot show it; a save after changing another permission must not drop it.
  it('is merged back so a form change does not remove an unlisted permission', () => {
    const granted = ['assets', 'plugin_disabled_bundle']
    const values = { ...splitPermissions(granted, grouped), permissionsBundles: ['plugin_datahub_config'] }

    expect(mergePermissions(values, unlistedPermissions(granted, grouped)))
      .toEqual(['assets', 'plugin_datahub_config', 'plugin_disabled_bundle'])
  })
})
