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
    tab: css`
        .pimcore-schedule-toolbar__headline__buttons {
            display: flex;
            justify-content: space-between;
            flex-grow: 1;

            .pimcore-schedule-toolbar__headline__buttons__add,
            .pimcore-schedule-toolbar__headline__buttons__save {
                display: flex;
                align-items: center;
                line-height: 22px;
            }
        }

        .pimcore-schedule-toolbar__filters {
            padding-top: ${token.paddingXXS}px;
            display: flex;
            justify-content: space-between;
        }
    }
      
    .pimcore-schedule-content__archive__toolbar {
        padding: ${token.paddingXS}px ${token.paddingXS}px ${token.paddingXS}px 0;
        display: flex;
        gap: 12px;
        align-items: center;

        .pimcore-schedule-content__archive__toolbar__headline {
            margin: 0
        }
    }
    `
  }
})
