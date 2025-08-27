/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { SidebarManager } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { injectable } from 'inversify'
import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'

@injectable()
export class DocumentEditorSidebarManager extends SidebarManager<IDocumentContext> {
}
