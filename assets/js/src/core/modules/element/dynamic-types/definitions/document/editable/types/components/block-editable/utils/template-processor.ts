/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'

export interface ProcessTemplateParams {
  templateHtml: string
  editableName: string
  nextKey: number
}

export interface ProcessedTemplate {
  html: string
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const processBlockTemplate = (
  { templateHtml, editableName, nextKey }: ProcessTemplateParams,
  templateEditables: any[]
): ProcessedTemplate => {
  const realName = editableName.split(':').pop() || editableName
  const fullName = editableName
  const escapedName = fullName.replace(/(:|\.)/g, '_')

  let processedHtml = templateHtml

  // Replace placeholder patterns with actual values
  processedHtml = processedHtml.replace(
    new RegExp(`"([^"]+):1000000\\.${realName}("|:)`, 'g'), 
    `"${fullName}$2`
  )
  processedHtml = processedHtml.replace(
    new RegExp(`"pimcore_editable_([^"]+)_1000000_${realName}_`, 'g'), 
    `"pimcore_editable_${escapedName}_`
  )
  processedHtml = processedHtml.replace(/:1000000\./g, `:${nextKey}.`)
  processedHtml = processedHtml.replace(/_1000000_/g, `_${nextKey}_`)
  processedHtml = processedHtml.replace(/="1000000"/g, `="${nextKey}"`)
  processedHtml = processedHtml.replace(/, 1000000"/g, `, ${nextKey}"`)

  // Process editable definitions
  const editableDefinitions: AbstractDocumentEditableDefinition[] = []

  templateEditables.forEach(editableDef => {
    const newEditableDef = { ...editableDef }

    if (newEditableDef.id) {
      newEditableDef.id = newEditableDef.id.replace(
        new RegExp(`pimcore_editable_([^"]+)_1000000_${realName}_`, 'g'), 
        `pimcore_editable_${escapedName}_`
      )
      newEditableDef.id = newEditableDef.id.replace(/_1000000_/g, `_${nextKey}_`)
    }

    if (newEditableDef.name) {
      newEditableDef.name = newEditableDef.name.replace(
        new RegExp(`^([^"]+):1000000\\.${realName}:`), 
        `${fullName}:`
      )
      newEditableDef.name = newEditableDef.name.replace(/:1000000\./g, `:${nextKey}.`)
    }

    if (newEditableDef.config?.blockStateStack) {
      try {
        const blockStateStack = JSON.parse(newEditableDef.config.blockStateStack)
        for (let i = 0; i < blockStateStack.length; i++) {
          if (blockStateStack[i].indexes) {
            for (let j = 0; j < blockStateStack[i].indexes.length; j++) {
              if (blockStateStack[i].indexes[j] === 1000000) {
                blockStateStack[i].indexes[j] = nextKey
              }
            }
          }
        }
        newEditableDef.config.blockStateStack = JSON.stringify(blockStateStack)
      } catch (e) {
        console.warn('Failed to parse blockStateStack:', e)
      }
    }

    const dynamicEditableDefinition: AbstractDocumentEditableDefinition = {
      id: newEditableDef.id,
      name: newEditableDef.name,
      realName: newEditableDef.name.split(':').pop() || newEditableDef.name,
      data: newEditableDef.data ?? null,
      config: newEditableDef.config ?? {},
      type: newEditableDef.type,
      inherited: false,
      inDialogBox: null,
      defaultFieldWidth: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
        xxl: 24
      }
    }

    editableDefinitions.push(dynamicEditableDefinition)
  })

  return {
    html: processedHtml,
    editableDefinitions
  }
}

export const ensurePortalTargets = (
  newBlockEntry: HTMLElement,
  editableDefinitions: AbstractDocumentEditableDefinition[]
): void => {
  editableDefinitions.forEach(definition => {
    if (definition.id) {
      const targetElement = document.getElementById(definition.id)
      if (!targetElement) {
        const targetDiv = document.createElement('div')
        targetDiv.id = definition.id
        targetDiv.setAttribute('data-name', definition.name)
        targetDiv.setAttribute('data-type', definition.type)
        newBlockEntry.appendChild(targetDiv)
      }
    }
  })
}