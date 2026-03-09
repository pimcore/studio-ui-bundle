/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { create, type LayoutProviderProps } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import React from 'react'

const { LayoutProvider: ObjectBrickCustomLayoutLayoutProviderInternal, useLayout: useObjectBrickCustomLayoutLayout } = create()

export { useObjectBrickCustomLayoutLayout }

/**
 * Wrapper that reads fieldDefinitionRegistry from the nearest SettingsProvider
 * and injects it into the raw factory LayoutProvider, the same way
 * DefaultLayoutProvider works in items/detail/layout-provider.tsx.
 *
 * Created at module level (not inside a component) so the React context
 * identity is stable across renders and the OB custom layout editor does not
 * share context with other editors.
 */
export const ObjectBrickCustomLayoutLayoutProvider = (props: Omit<LayoutProviderProps, 'fieldDefinitionRegistry'>): React.JSX.Element => {
  const { fieldDefinitionRegistry } = useSettings()

  return (
    <ObjectBrickCustomLayoutLayoutProviderInternal
      { ...props }
      fieldDefinitionRegistry={ fieldDefinitionRegistry }
    />
  )
}
