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
import { type IPipelineItemExpandContext, PipelineItemExpandContext } from './pipeline-item-expand-provider'

// optional by design: pipelines rendered without the provider simply have no expand behaviour
export const usePipelineItemExpand = (): IPipelineItemExpandContext => {
  return useContext(PipelineItemExpandContext)
}
