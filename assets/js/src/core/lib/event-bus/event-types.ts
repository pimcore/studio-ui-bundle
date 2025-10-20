/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Event types constants for the application event bus
 * 
 * Naming convention: module:scope:action
 * - module: The main module (e.g., widget-manager, asset, document)
 * - scope: The specific area within the module (e.g., inner, outer, tree)
 * - action: The action that occurred (e.g., widget-closed, item-selected)
 */
export const eventTypes = {
  'widget-manager:inner:widget-closed': 'widget-manager:inner:widget-closed'
}
