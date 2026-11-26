/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { StaticLoader } from './loader/static-loader'
import { ApiLoader } from './loader/api-loader'
import { ColumnConfigLoader as GridConfigurationLoader } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader'
import { useIsClassColumnConfiguration } from './use-is-class-column-configuration'

export interface ColumnConfigLoaderProps {
  Component: AbstractDecoratorProps['ConfigurationComponent']
  /**
   * Load the columns from the saved grid configurations (the selected template, else the
   * user's favorite, else the class defaults) instead of the search defaults, so templates
   * saved and shared from this listing can be applied.
   */
  saveEnabled?: boolean
}

export const ColumnConfigLoader = ({ Component, saveEnabled = false }: ColumnConfigLoaderProps): React.JSX.Element => {
  const isClassColumnConfiguration = useIsClassColumnConfiguration()

  if (isClassColumnConfiguration && saveEnabled) {
    return <GridConfigurationLoader Component={ Component } />
  }

  if (isClassColumnConfiguration) {
    return <ApiLoader Component={ Component } />
  }

  return <StaticLoader Component={ Component } />
}
