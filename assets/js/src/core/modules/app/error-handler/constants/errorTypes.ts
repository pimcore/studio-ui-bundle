/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* In this file, we're keeping the unused data as documentation of what we have exactly. */

export enum ErrorTypes {
  API_ERROR = 'API_ERROR',
  GENERAL_ERROR = 'GENERAL_ERROR'
}

export enum ErrorKeyTypes {
  GENERIC_ERROR = 'error_something_generic_went_wrong',
  ELEMENT_EXISTS = 'error_element_exists',
  FOLDER_EXISTS = 'error_folder_exists',
  INVALID_ARGUMENT = 'error_invalid_argument',
  WIDGET_NAME_MISSING = 'error_widget_name_missing',
  WIDGET_NAME_INVALID = 'error_widget_name_invalid',
  VALIDATION_FAILED = 'error_validation_failed',
  ELEMENT_VALIDATION_FAILED = 'error_element_validation_failed',
}
