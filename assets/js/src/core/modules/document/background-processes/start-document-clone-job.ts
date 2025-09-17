/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useGlobalMessageRegistry } from '@Pimcore/modules/background-processor'
import { DocumentCloneJobHandler } from '@Pimcore/modules/background-processor/handlers/document-clone-job-handler'
import { ElementType } from '@Pimcore/types/enums/element/element-type'
import { store } from '@Pimcore/app/store'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { api } from '@Pimcore/modules/document/document-api-slice.gen'

export interface DocumentCloneJobConfig {
  sourceId: number
  targetId: number
  parentFolder: number
  elementType: ElementType
  title: string
  parameters?: any
  isReplace?: boolean
}

/**
 * Start a document clone job - non-hook implementation for use in event handlers
 */
export const startDocumentCloneJob = async (
  config: DocumentCloneJobConfig,
  // Legacy parameters for backward compatibility - these are not used
  documentCloneMutation?: any,
  documentReplaceContentMutation?: any,
  addJob?: any,
  updateJob?: any,
  dispatch?: any
): Promise<void> => {
  console.log('🚀 Starting document clone job with config:', config)
  
  // Get message registry using the hook
  const messageRegistry = useGlobalMessageRegistry()
  
  try {
    // Make API call using RTK Query endpoints
    let result: any
    
    if (config.isReplace) {
      console.log('📡 Making document replace content API call')
      result = await store.dispatch(
        api.endpoints.documentReplaceContent.initiate({
          sourceId: config.sourceId,
          targetId: config.targetId
        })
      ).unwrap()
    } else {
      console.log('📡 Making document clone API call')
      result = await store.dispatch(
        api.endpoints.documentClone.initiate({
          id: config.sourceId,
          parentId: config.targetId,
          ...(config.parameters && { documentCloneParameters: config.parameters })
        })
      ).unwrap()
    }
    
    const jobRunId = result?.jobRunId
    
    // If no jobRunId, operation completed immediately
    if (!jobRunId) {
      console.log('✅ Document operation completed immediately without background processing')
      
      // Refresh the tree
      store.dispatch(refreshNodeChildren({ 
        nodeId: config.parentFolder.toString(), 
        elementType: config.elementType 
      }))
      
      return
    }
    
    console.log('✅ Got jobRunId from API:', jobRunId, '- setting up background job tracking')
    
    // Register job handler using the new abstract handler system
    const handler = new DocumentCloneJobHandler(jobRunId, {
      title: config.title,
      parentFolder: config.parentFolder.toString(),
      elementType: config.elementType,
      sourceId: config.sourceId,
      targetId: config.targetId,
      parameters: config.parameters,
      isReplace: config.isReplace
    })
    
    messageRegistry.registerHandler(handler)
    
  } catch (error) {
    console.error('❌ Document clone job failed:', error)
    // Re-throw to allow caller to handle
    throw error
  }
}