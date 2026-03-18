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

const { LayoutProvider: LayoutProviderInternal, useLayout } = create()

export { useLayout }

export const LayoutProvider = (props: Omit<LayoutProviderProps, 'fieldDefinitionRegistry'>): React.JSX.Element => {
  const { fieldDefinitionRegistry } = useSettings()

  return (
    <LayoutProviderInternal
      { ...props }
      fieldDefinitionRegistry={ fieldDefinitionRegistry }
    />
  )
}
