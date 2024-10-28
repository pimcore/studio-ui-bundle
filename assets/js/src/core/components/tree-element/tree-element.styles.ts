/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { createStyles } from 'antd-style'

interface IStylesProps {
  isHideRootChecker?: boolean
}

export const useStyles = createStyles(({ css }, props: IStylesProps) => {
  return {
    treeContainer: css`
      .ant-tree-list-holder-inner {
        .ant-tree-treenode-leaf-last {
          &:first-child {
            .ant-tree-checkbox {
              display: ${(props.isHideRootChecker === true) ? 'none' : 'block'};
            }
          }
        }
      }
      
      .ant-tree-switcher {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .ant-tree-switcher_close {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(0deg);
          }
        }
      }

      .ant-tree-switcher_open {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(-180deg);
          }
        }
      }
    `
  }
})
