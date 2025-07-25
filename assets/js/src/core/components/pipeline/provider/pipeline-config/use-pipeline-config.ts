/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type IPipelineConfigProviderContext, PipelineConfigProviderContext } from './pipeline-config-provider'

export interface UsePipelineConfigReturn {
  config: IPipelineConfigProviderContext['config']
}

export const usePipelineConfig = (): UsePipelineConfigReturn => {
  const context = useContext(PipelineConfigProviderContext)

  if (context === undefined) {
    throw new Error('usePipelineConfig must be used within a PipelineConfigProvider')
  }

  return {
    config: context.config
  }
}
