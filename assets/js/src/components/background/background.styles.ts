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

export const useStyle = createStyles(({ token, css }) => {
  return {
    background: css`
      position: absolute;
      inset: 0;
      background: #FFF;
      overflow: hidden; 
      opacity: 0.3;

      .background-figure {
        position: absolute;

        &--top-left {
          top: -80%;
          left: -30%;
          width: 1324px;
          height: 1324px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1324px);
          background: rgba(55, 217, 243, 0.20);
          filter: blur(310px);
        }


        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          transform: rotate(28.303deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1503.398px);
          background: #FDFFFF;
          filter: blur(310px);
        }

        &--bottom-right {
          left: 11%;
          width: 1642px;
          height: 686px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1642px);
          background: rgba(122, 58, 212, 0.42);
          filter: blur(310px);
        }
      }
    `
  }
}, { hashPriority: 'low' })
