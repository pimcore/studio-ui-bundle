/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ css }) => ({
  // Blocks every interaction inside the fields area (add-source-field/add-transformer dropdowns,
  // per-step config forms, drag handles, …) regardless of which dynamic type is registered there -
  // `Form`'s own `disabled` prop only reaches standard antd form controls, not a dynamic type's own
  // custom widgets. `aria-disabled` documents the state for assistive tech since the elements
  // underneath keep their own (now inert) roles.
  readOnly: css`
    pointer-events: none;
  `
}))
