/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18next, { type TFunction } from 'i18next'
import { describeAccess } from './utils'

const grants = (count: number): Array<{ name: string, canRead: boolean, canAccess: boolean, canEdit: boolean }> =>
  Array.from({ length: count }, (_, index) => ({ name: `u${index}`, canRead: true, canAccess: true, canEdit: false }))

// A real i18next instance, configured like the app (fallback to English, no key
// separator), so the labels resolve the way they do in Studio.
const translator = async (lng: string): Promise<TFunction> => {
  const i18n = i18next.createInstance()
  await i18n.init({
    lng,
    fallbackLng: 'en',
    keySeparator: false,
    nsSeparator: false,
    resources: {
      en: {
        translation: {
          'mcp-servers.access.users-count': 'Users: {{number}}',
          'mcp-servers.access.roles-count': 'Roles: {{number}}'
        }
      },
      pl: {
        translation: {
          'mcp-servers.access.users-count': 'Użytkownicy: {{number}}',
          'mcp-servers.access.roles-count': 'Role: {{number}}'
        }
      }
    }
  })
  return i18n.t
}

describe('describeAccess', () => {
  it('labels user and role counts without grammatical number', async () => {
    const t = await translator('en')

    expect(describeAccess({ shareGlobal: false, sharedUsers: grants(1), sharedRoles: grants(2) }, t)).toBe('Users: 1, Roles: 2')
    expect(describeAccess({ shareGlobal: false, sharedUsers: grants(5), sharedRoles: [] }, t)).toBe('Users: 5')
  })

  // Polish has one/few/many forms, which a one-vs-many branch cannot express and which
  // the translation files cannot carry (they mirror the English keys). A count-neutral
  // label is correct for every count, in every language.
  it('stays in the viewer\'s language for every count', async () => {
    const t = await translator('pl')

    for (const count of [1, 2, 5, 22]) {
      expect(describeAccess({ shareGlobal: false, sharedUsers: grants(count), sharedRoles: [] }, t)).toBe(`Użytkownicy: ${count}`)
    }
  })
})
