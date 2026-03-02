/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SettingsProviderProps, type UseDetailLayoutAccessorReturn } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type ClassObjectBrickCustomLayoutGetApiResponse } from '@sdk/api/class-definition'

export const useObjectBrickCustomLayoutLayoutAccessor: SettingsProviderProps['useDetailLayoutAccessor'] = () => {
  const accessor: UseDetailLayoutAccessorReturn['accessor'] = (data: ClassObjectBrickCustomLayoutGetApiResponse) => {
    return data.layoutDefinition ?? undefined
  }

  return { accessor }
}
