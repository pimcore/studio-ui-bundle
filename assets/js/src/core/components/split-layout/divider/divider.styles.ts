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

export const useStyles = createStyles(({ css, token }) => ({
  dividerContainer: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 100%;
  `,

  resizable: css`
    cursor: col-resize;
  `,

  divider: css`
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100%;
    overflow: hidden;
    background-color: ${token.Divider.colorSplit};
  `,

  iconContainer: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    padding: 4px;
    display: flex;
    border: 1px solid ${token.colorBorderContainer};
    background-color: ${token.Divider.colorBgContainer};
    border-radius: ${token.Divider.borderRadiusSM};
  `,

  icon: css`
    color: ${token.colorPrimary};
  `
}))
