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

export const useStyles = createStyles(({ token, css }) => {
  return {
    // The control comes first and its label follows on the same row, 4px apart. The label
    // keeps all it carries (inheritance, tooltip, required mark); only the order changes.
    // The doubled class outranks AntD's vertical layout rules (up to five classes deep).
    labelAfterControl: css`
      &&.ant-form-item:not(.ant-form-item-horizontal) > .ant-form-item-row {
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        gap: ${token.marginXXS}px;

        > .ant-form-item-label {
          flex: 0 1 auto;
          padding: 0;
        }

        > .ant-form-item-control {
          flex: 0 0 auto;
          width: auto;
        }
      }

      /* Inside object bricks and field collections the field is a VirtualItem:
         label, control and messages as siblings. */
      &&:not(.ant-form-item) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        column-gap: ${token.marginXXS}px;

        > .virtual-item__label {
          order: 1;
          padding: 0;
        }

        /* the control, inset like a checkbox after a top label, so it lines up with label text */
        > :not(.virtual-item__label, .virtual-item__explain) {
          padding-left: ${token.paddingXXS}px;
        }

        > .virtual-item__explain {
          order: 2;
          flex-basis: 100%;
        }
      }
    `
  }
})
