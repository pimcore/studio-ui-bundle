/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef, useEffect, useState } from 'react'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { isNil } from 'lodash'
import { RenderEditable } from '../editables-renderer/render-editable'

interface TemplateAwareEditableProps {
  editableDefinition: AbstractDocumentEditableDefinition
}

export const TemplateAwareEditable = ({ editableDefinition }: TemplateAwareEditableProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [templateApplied, setTemplateApplied] = useState(false)

  useEffect(() => {
    if (isNil(containerRef.current)) {
      return
    }

    const templateId = `template__${editableDefinition.id}`
    const templateElement = document.getElementById(templateId)
    
    if (isNil(templateElement) || templateElement.tagName.toLowerCase() !== 'template') {
      setTemplateApplied(true)
      return
    }

    const template = templateElement as HTMLTemplateElement
    const templateContent = template.content.cloneNode(true) as DocumentFragment
    
    if (templateContent.children.length > 0) {
      const templateDiv = templateContent.firstElementChild as HTMLDivElement
      
      if (!isNil(templateDiv)) {
        Array.from(templateDiv.attributes).forEach(attr => {
          if (attr.name !== 'id') {
            containerRef.current?.setAttribute(attr.name, attr.value)
          }
        })
        
        if (templateDiv.innerHTML.trim() !== '') {
          containerRef.current!.innerHTML = templateDiv.innerHTML
        }
        
        if (templateDiv.className) {
          containerRef.current!.className = templateDiv.className
        }
      }
    }
    
    setTemplateApplied(true)
  }, [editableDefinition.id])

  return (
    <div ref={containerRef}>
      {templateApplied && (
        <RenderEditable
          editableDefinition={editableDefinition}
          containerRef={containerRef}
        />
      )}
    </div>
  )
}