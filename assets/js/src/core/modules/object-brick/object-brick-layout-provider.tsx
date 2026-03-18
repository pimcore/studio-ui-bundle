/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { create } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'

/**
 * Isolated layout context for the ObjectBrick outer editor.
 * Created at module level (not inside a component) so the React context
 * identity is stable across renders. This prevents the OB editor from
 * sharing the singleton context with the Class Definition editor, which
 * would cause DetailParentTree to show the wrong layout when both editors
 * are open simultaneously.
 */
export const {
  LayoutProvider: ObjectBrickLayoutProvider,
  useLayout: useObjectBrickLayout
} = create()
