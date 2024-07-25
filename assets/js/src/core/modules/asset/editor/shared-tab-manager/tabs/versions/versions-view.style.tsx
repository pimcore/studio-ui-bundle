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

export const useStyles = createStyles(({ token, css }) => {
  const versionToken = { versionsLeftSideWidth: '383', ...token }

  return {
    versions: css`
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        overflow: hidden;

        & .left-side {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;

            height: 100%;
            width: ${versionToken.versionsLeftSideWidth}px;
        }

        & .left-side > .flexbox-start-end {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: ${versionToken.paddingSM}px;
        }

        .version-label {

            font-weight: 600;
            color: ${token.colorPrimary};
            margin: 0 8px 0 0;

            &:hover {
                color: ${token.colorPrimaryHover};
            }
        }


        & .ant-btn-icon {
            vertical-align: text-bottom;
        }

        & .compare-button {
            background-color: ${versionToken.colorFillAlter};
        }
    `,
    noContent: css`
        padding: ${token.paddingSM}px;
        height: 100%;
        display: flex;
        flex-direction: column;
        
      .headline {
          font-weight: 600;
          color: ${token.colorPrimary};
          margin: 0 8px 0 0;

          &:hover {
              color: ${token.colorPrimaryHover};
          }
      }
        
        .empty-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `
  }
}, { hashPriority: 'low' })
