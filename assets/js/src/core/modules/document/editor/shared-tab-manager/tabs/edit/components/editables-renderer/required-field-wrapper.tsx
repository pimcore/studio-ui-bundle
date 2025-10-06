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

export const applyRequiredStyling = (editableName: string, iframeDocument?: Document): void => {
  const editableElement = (iframeDocument ?? document).getElementById(`pimcore_editable_${editableName}`)
  editableElement?.setAttribute('data-required-active', 'true')
}

export const removeRequiredStyling = (editableName: string, iframeDocument?: Document): void => {
  const editableElement = (iframeDocument ?? document).getElementById(`pimcore_editable_${editableName}`)
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
