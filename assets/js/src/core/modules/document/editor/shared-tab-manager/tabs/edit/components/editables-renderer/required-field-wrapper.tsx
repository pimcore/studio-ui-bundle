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
import { useStyles } from './required-field-wrapper.styles'

export interface RequiredFieldWrapperProps {
  children: React.ReactNode
  isRequired: boolean
  editableName: string
}

// editableId is the DOM id of the editable container (AbstractDocumentEditableDefinition.id). It can't be
// derived from the editable name, as core replaces ":" and "." of nested editables (e.g. "content:1.headline")
export const applyRequiredStyling = (editableId: string, iframeDocument?: Document): void => {
  const editableElement = (iframeDocument ?? document).getElementById(editableId)
  editableElement?.setAttribute('data-required-active', 'true')
}

export const removeRequiredStyling = (editableId: string, iframeDocument?: Document): void => {
  const editableElement = (iframeDocument ?? document).getElementById(editableId)
  editableElement?.removeAttribute('data-required-active')
}

export const RequiredFieldWrapper = ({ children, isRequired, editableName }: RequiredFieldWrapperProps): React.JSX.Element => {
  const { styles } = useStyles()

  if (!isRequired) {
    return <>{children}</>
  }

  return (
    <div
      className={ `${styles.requiredFieldWrapper} studio-required-field-wrapper` }
      data-editable-name={ editableName }
    >
      {children}
    </div>
  )
}
