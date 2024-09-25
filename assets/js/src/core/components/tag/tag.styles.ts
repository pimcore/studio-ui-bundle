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

export const useStyles = createStyles(({ css, token }) => {
  return {
    tag: css`
      &.ant-tag {
        &.ant-tag-default {
            background-color: ${token.colorFillTertiary};
            color: ${token.colorTextLabel};
            border-color: ${token.Tag.colorBorder};
        }
        
        &.theme-transparent {
          background-color: ${token.colorFillTertiary};
          border-color: ${token.colorBorder};
        }

        .anticon + span {
          margin-inline-start: 4px;
        }
      }
    `
  }
})
