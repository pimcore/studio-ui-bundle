/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { isNil } from 'lodash'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type ReactElement } from 'react'
import { type IFieldWidthContext } from '@sdk/modules/element'

export interface AbstractDocumentEditableDefinition {
  id: string
  name: string
  realName: string
  data: any
  config?: any
  type: string
  inherited: boolean
  inDialogBox: string | null
  value?: any
  onChange?: (value: any) => void
  defaultFieldWidth: IFieldWidthContext
  containerRef?: React.RefObject<HTMLDivElement>
}

@injectable()
export abstract class DynamicTypeDocumentEditableAbstract implements DynamicTypeAbstract {
  abstract readonly id: string

  abstract getEditableDataComponent (props: AbstractDocumentEditableDefinition): ReactElement<AbstractDocumentEditableDefinition>

  transformValue (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  /**
   * Transform the internal editable value to the format expected by the backend API
   * This is the reverse of transformValue - used when sending data to update endpoints
   * @param value The internal editable value
   * @param props The editable props
   * @returns The value formatted for the backend API
   */
  transformValueForApi (value: any, props: AbstractDocumentEditableDefinition): any {
    return value
  }

  /**
   * Helper method to check if the editable has reload config enabled
   */
  protected hasReloadConfig (props: AbstractDocumentEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }

  /**
   * Helper method to check if the editable has required config enabled
   */
  hasRequiredConfig (props: AbstractDocumentEditableDefinition): boolean {
    return Boolean(props.config?.required)
  }

  /**
   * Determines if the editable should trigger immediate auto-save and reload on change
   * @param props The editable props
   * @returns true if should reload on change, false for normal debounced auto-save
   */
  reloadOnChange (props: AbstractDocumentEditableDefinition, oldValue: any, newValue: any): boolean {
    return this.hasReloadConfig(props)
  }

  /**
   * Determines if the current value is empty for validation purposes.
   * Base implementation only checks for null and undefined.
   * Each editable type should override this method to implement type-specific empty checks.
   * @param value The current value of the editable
   * @param props The editable props
   * @returns true if the value is considered empty, false otherwise
   */
  isEmpty (value: any, props: AbstractDocumentEditableDefinition): boolean {
    return isNil(value)
  }

  /**
   * Validates if the editable meets the required field constraint
   * @param value The current value of the editable
   * @param props The editable props
   * @returns true if validation passes, false if the field is required but empty
   */
  validateRequired (value: any, props: AbstractDocumentEditableDefinition): boolean {
    if (!this.hasRequiredConfig(props)) {
      return true // Not required, so validation passes
    }

    return !this.isEmpty(value, props)
  }

  /**
   * Called when the document is ready and initialized.
   * Each dynamic type can implement this to perform type-specific initialization,
   * such as notifying the parent about special data structures.
   * @param documentId The ID of the document
   * @param editableDefinitions All editable definitions in the document
   */
  onDocumentReady (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
    // Default implementation does nothing
    // Specific dynamic types can override this to perform type-specific actions
  }
}
