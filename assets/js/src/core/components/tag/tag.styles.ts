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
        .anticon + span {
            margin-inline-start: 4px;
        }

        &.ant-tag.theme-transparent {
            background-color: transparent;
        }

        &.ant-tag.theme-user-role,
        &.ant-tag.theme-admin-role {
            background-color: rgba(0, 0, 0, 0.04);
            color: #565656;
            border-color: #EBEBEB;
        }

    `
  }
})