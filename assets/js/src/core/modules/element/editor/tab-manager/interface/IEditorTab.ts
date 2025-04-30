/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type IElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

export interface IEditorTab {
  key: string
  label: string | React.JSX.Element
  children: React.JSX.Element
  icon: React.JSX.Element
  workspacePermission?: keyof ElementPermissions | string
  userPermission?: string
  hidden?: (element: IElementDraft) => boolean
  isDetachable?: boolean
}
