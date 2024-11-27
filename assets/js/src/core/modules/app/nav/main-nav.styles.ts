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

export const useStlyes = createStyles(({
  token,
  css
}) => {
  return {
    mainNav: css`
      position: absolute;
      left: 100%;
      top: 0;
      background: #fff;
      padding: ${token.paddingMD}px 0;
      box-shadow: ${token.boxShadow};
      width: 818px;
      text-align: left;
      
      .main-nav__list-sub {
        box-shadow: none;
      }
    `
  }
}, { hashPriority: 'low' })
