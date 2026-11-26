/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { GridConfig, type GridConfigProps } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config'
import { useIsClassColumnConfiguration } from '../configuration-layer/components/column-config-loader/use-is-class-column-configuration'

/**
 * Grid templates belong to a class definition, so saving and loading them is only offered
 * while the listing shows one class's columns - never for the static system columns.
 */
export const SearchGridConfig = ({ settings }: GridConfigProps): React.JSX.Element => {
  const isClassColumnConfiguration = useIsClassColumnConfiguration()

  return (
    <GridConfig settings={ {
      ...settings,
      saveEnabled: settings?.saveEnabled === true && isClassColumnConfiguration
    } }
    />
  )
}
