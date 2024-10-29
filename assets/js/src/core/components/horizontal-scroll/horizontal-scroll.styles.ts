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

export const useStyles = createStyles(({ css }, { hideElement, scrollRequired }) => {
  return {
    buttonContainer: css`
        visibility: ${hideElement === true ? 'hidden' : 'visible'};
        overflow: hidden;
        background-color: cyan;
        width: 100%;
       
.button-left {
       position: absolute;
       left: 0;
       top: 50%; 
       transform: translate(0, -50%);
       }
       .button-right {
       position: absolute;
       right: 0;
       top: 50%; 
       transform: translate(0, -50%);
       }
    `,

    scroll: css`
    margin-left: ${scrollRequired === true ? '25px' : 0};
    margin-right: ${scrollRequired === true ? '25px' : 0};
    min-width: ${scrollRequired === true ? 'calc(100% - 50px)' : '100%'};
    height: 102%; // to make up for added height from scroll bar flex combination
        overflow-x: auto;
        white-space: nowrap;
        &::-webkit-scrollbar {
            display: none;
        }
    `,

    childrenContainer: css`
    width: 80%
    `
  }
})
