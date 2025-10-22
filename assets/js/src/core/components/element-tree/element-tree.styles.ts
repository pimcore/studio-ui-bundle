/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    tree: css`
      padding: ${token.paddingXXS}px 0 ${token.paddingXS}px 0;
      max-width: 100%;
      color: ${token.colorTextTreeElement};

      .hotspot-droppable .tree-node__content-wrapper-outer {
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        height: 24px;
      }

      .dnd--hotspot-sorting-top-valid .tree-node__content-wrapper-outer {
        border-top: 2px solid ${token.colorPrimary};

        &::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -1px;
          border-radius: 50%;
          width: 7px;
          height: 7px;
          background-color: ${token.colorPrimary};
        }
      }

      .dnd--hotspot-sorting-bottom-valid .tree-node__content-wrapper-outer {
        border-bottom: 2px solid ${token.colorPrimary};

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: -1px;
          border-radius: 50%;
          width: 7px;
          height: 7px;
          background-color: ${token.colorPrimary};
        }
      }

      .dnd--hotspot-drop-middle-valid .tree-node__content-wrapper-outer {
        background: ${token.colorBgContainerDisabled};
        border-radius: ${token.borderRadius}px;
        outline: 1px dashed ${token.colorBorder};
      }
    `
  }
}, { hashPriority: 'low' })
