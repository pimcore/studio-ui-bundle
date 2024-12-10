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

/* eslint-disable max-lines */

import { createGlobalStyle } from 'antd-style'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  /** MESSAGE **/
  .ant-message {
    position: absolute;
    bottom: 20px !important;
    top: unset !important;
  }

  @keyframes moveUp {
    0% {
        transform: translateY(+30%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
  }

  .ant-message .ant-message-move-up-appear,
  .ant-message .ant-message-move-up-enter {
    animation-name: moveUp;
  }

  .ant-message .ant-message-move-up-leave {
    animation-name: moveUp;
    animation-direction: reverse;
  }

  .p-none {
    padding: 0;
  }

  .p-mini {
    padding: ${props => props.theme.paddingXXS}px;
  }

  .p-extra-small {
    padding: ${props => props.theme.paddingXS}px;
  }

  .p-small {
    padding: ${props => props.theme.paddingSM}px;
  }

  .p-normal {
    padding: ${props => props.theme.padding}px;
  }

  .p-medium {
    padding: ${props => props.theme.paddingMD}px;
  }

  .p-large {
    padding: ${props => props.theme.paddingLG}px;
  }

  .p-extra-large {
    padding: ${props => props.theme.paddingXL}px;
  }

  .p-maxi {
    // @todo check missing padding token
    padding: ${props => props.theme.sizeXXL}px;
  }

  .p-y-none {
    padding-top: 0;
    padding-bottom: 0;
  }

  .p-y-mini {
    padding-top: ${props => props.theme.paddingXXS}px;
    padding-bottom: ${props => props.theme.paddingXXS}px;
  }

  .p-y-extra-small {
    padding-top: ${props => props.theme.paddingXS}px;
    padding-bottom: ${props => props.theme.paddingXS}px;
  }

  .p-y-small {
    padding-top: ${props => props.theme.paddingSM}px;
    padding-bottom: ${props => props.theme.paddingSM}px;
  }

  .p-y-normal {
    padding-top: ${props => props.theme.padding}px;
    padding-bottom: ${props => props.theme.padding}px;
  }

  .p-y-medium {
    padding-top: ${props => props.theme.paddingMD}px;
    padding-bottom: ${props => props.theme.paddingMD}px;
  }

  .p-y-large {
    padding-top: ${props => props.theme.paddingLG}px;
    padding-bottom: ${props => props.theme.paddingLG}px;
  }

  .p-y-extra-large {
    padding-top: ${props => props.theme.paddingXL}px;
    padding-bottom: ${props => props.theme.paddingXL}px;
  }

  .p-y-maxi {
    // @todo check missing padding token
    padding-top: ${props => props.theme.sizeXXL}px;
    padding-bottom: ${props => props.theme.sizeXXL}px;
  }

  .p-x-none {
    padding-left: 0;
    padding-right: 0;
  }

  .p-x-mini {
    padding-left: ${props => props.theme.paddingXXS}px;
    padding-right: ${props => props.theme.paddingXXS}px;
  }

  .p-x-extra-small {
    padding-left: ${props => props.theme.paddingXS}px;
    padding-right: ${props => props.theme.paddingXS}px;
  }

  .p-x-small {
    padding-left: ${props => props.theme.paddingSM}px;
    padding-right: ${props => props.theme.paddingSM}px;
  }

  .p-x-normal {
    padding-left: ${props => props.theme.padding}px;
    padding-right: ${props => props.theme.padding}px;
  }

  .p-x-medium {
    padding-left: ${props => props.theme.paddingMD}px;
    padding-right: ${props => props.theme.paddingMD}px;
  }

  .p-x-large {
    padding-left: ${props => props.theme.paddingLG}px;
    padding-right: ${props => props.theme.paddingLG}px;
  }

  .p-x-extra-large {
    padding-left: ${props => props.theme.paddingXL}px;
    padding-right: ${props => props.theme.paddingXL}px;
  }

  .p-x-maxi {
    // @todo check missing padding token
    padding-left: ${props => props.theme.sizeXXL}px;
    padding-right: ${props => props.theme.sizeXXL}px;
  }

  .p-t-none {
    padding-top: 0;
  }

  .p-t-mini {
    padding-top: ${props => props.theme.paddingXXS}px;
  }

  .p-t-extra-small {
    padding-top: ${props => props.theme.paddingXS}px;
  }

  .p-t-small {
    padding-top: ${props => props.theme.paddingSM}px;
  }

  .p-t-normal {
    padding-top: ${props => props.theme.padding}px;
  }

  .p-t-medium {
    padding-top: ${props => props.theme.paddingMD}px;
  }

  .p-t-large {
    padding-top: ${props => props.theme.paddingLG}px;
  }

  .p-t-extra-large {
    padding-top: ${props => props.theme.paddingXL}px;
  }

  .p-t-maxi {
    // @todo check missing padding token
    padding-top: ${props => props.theme.sizeXXL}px;
  }

  .p-b-none {
    padding-bottom: 0;
  }

  .p-b-mini {
    padding-bottom: ${props => props.theme.paddingXXS}px;
  }

  .p-b-extra-small {
    padding-bottom: ${props => props.theme.paddingXS}px;
  }

  .p-b-small {
    padding-bottom: ${props => props.theme.paddingSM}px;
  }

  .p-b-normal {
    padding-bottom: ${props => props.theme.padding}px;
  }

  .p-b-medium {
    padding-bottom: ${props => props.theme.paddingMD}px;
  }

  .p-b-large {
    padding-bottom: ${props => props.theme.paddingLG}px;
  }

  .p-b-extra-large {
    padding-bottom: ${props => props.theme.paddingXL}px;
  }

  .p-b-maxi {
    // @todo check missing padding token
    padding-bottom: ${props => props.theme.sizeXXL}px;
  }

  .p-l-none {
    padding-left: 0;
  }

  .p-l-mini {
    padding-left: ${props => props.theme.paddingXXS}px;
  }

  .p-l-extra-small {
    padding-left: ${props => props.theme.paddingXS}px;
  }

  .p-l-small {
    padding-left: ${props => props.theme.paddingSM}px;
  }

  .p-l-normal {
    padding-left: ${props => props.theme.padding}px;
  }

  .p-l-medium {
    padding-left: ${props => props.theme.paddingMD}px;
  }

  .p-l-large {
    padding-left: ${props => props.theme.paddingLG}px;
  }

  .p-l-extra-large {
    padding-left: ${props => props.theme.paddingXL}px;
  }

  .p-l-maxi {
    // @todo check missing padding token
    padding-left: ${props => props.theme.sizeXXL}px;
  }

  .p-r-none {
    padding-right: 0;
  }

  .p-r-mini {
    padding-right: ${props => props.theme.paddingXXS}px;
  }

  .p-r-extra-small {
    padding-right: ${props => props.theme.paddingXS}px;
  }

  .p-r-small {
    padding-right: ${props => props.theme.paddingSM}px;
  }

  .p-r-normal {
    padding-right: ${props => props.theme.padding}px;
  }

  .p-r-medium {
    padding-right: ${props => props.theme.paddingMD}px;
  }

  .p-r-large {
    padding-right: ${props => props.theme.paddingLG}px;
  }

  .p-r-extra-large {
    padding-right: ${props => props.theme.paddingXL}px;
  }

  .p-r-maxi {
    // @todo check missing padding token
    padding-right: ${props => props.theme.sizeXXL}px;
  }

  .m-none {
    margin: 0;
  }

  .m-mini {
    margin: ${props => props.theme.marginXXS}px;
  }

  .m-extra-small {
    margin: ${props => props.theme.marginXS}px;
  }

  .m-small {
    margin: ${props => props.theme.marginSM}px;
  }

  .m-normal {
    margin: ${props => props.theme.margin}px;
  }

  .m-medium {
    margin: ${props => props.theme.marginMD}px;
  }

  .m-large {
    margin: ${props => props.theme.marginLG}px;
  }

  .m-extra-large {
    margin: ${props => props.theme.marginXL}px;
  }

  .m-maxi {
    // @todo check missing margin token
    margin: ${props => props.theme.sizeXXL}px;
  }

  .m-y-none {
    margin-top: 0;
    margin-bottom: 0;
  }

  .m-y-mini {
    margin-top: ${props => props.theme.marginXXS}px;
    margin-bottom: ${props => props.theme.marginXXS}px;
  }

  .m-y-extra-small {
    margin-top: ${props => props.theme.marginXS}px;
    margin-bottom: ${props => props.theme.marginXS}px;
  }

  .m-y-small {
    margin-top: ${props => props.theme.marginSM}px;
    margin-bottom: ${props => props.theme.marginSM}px;
  }

  .m-y-normal {
    margin-top: ${props => props.theme.margin}px;
    margin-bottom: ${props => props.theme.margin}px;
  }

  .m-y-medium {
    margin-top: ${props => props.theme.marginMD}px;
    margin-bottom: ${props => props.theme.marginMD}px;
  }

  .m-y-large {
    margin-top: ${props => props.theme.marginLG}px;
    margin-bottom: ${props => props.theme.marginLG}px;
  }

  .m-y-extra-large {
    margin-top: ${props => props.theme.marginXL}px;
    margin-bottom: ${props => props.theme.marginXL}px;
  }

  .m-y-maxi {
    // @todo check missing margin token
    margin-top: ${props => props.theme.sizeXXL}px;
    margin-bottom: ${props => props.theme.sizeXXL}px;
  }

  .m-x-none {
    margin-left: 0;
    margin-right: 0;
  }

  .m-x-mini {
    margin-left: ${props => props.theme.marginXXS}px;
    margin-right: ${props => props.theme.marginXXS}px;
  }

  .m-x-extra-small {
    margin-left: ${props => props.theme.marginXS}px;
    margin-right: ${props => props.theme.marginXS}px;
  }

  .m-x-small {
    margin-left: ${props => props.theme.marginSM}px;
    margin-right: ${props => props.theme.marginSM}px;
  }

  .m-x-normal {
    margin-left: ${props => props.theme.margin}px;
    margin-right: ${props => props.theme.margin}px;
  }

  .m-x-medium {
    margin-left: ${props => props.theme.marginMD}px;
    margin-right: ${props => props.theme.marginMD}px;
  }

  .m-x-large {
    margin-left: ${props => props.theme.marginLG}px;
    margin-right: ${props => props.theme.marginLG}px;
  }

  .m-x-extra-large {
    margin-left: ${props => props.theme.marginXL}px;
    margin-right: ${props => props.theme.marginXL}px;
  }

  .m-x-maxi {
    // @todo check missing margin token
    margin-left: ${props => props.theme.sizeXXL}px;
    margin-right: ${props => props.theme.sizeXXL}px;
  }

  .m-t-none {
    margin-top: 0;
  }

  .m-t-mini {
    margin-top: ${props => props.theme.marginXXS}px;
  }

  .m-t-extra-small {
    margin-top: ${props => props.theme.marginXS}px;
  }

  .m-t-small {
    margin-top: ${props => props.theme.marginSM}px;
  }

  .m-t-normal {
    margin-top: ${props => props.theme.margin}px;
  }

  .m-t-medium {
    margin-top: ${props => props.theme.marginMD}px;
  }

  .m-t-large {
    margin-top: ${props => props.theme.marginLG}px;
  }

  .m-t-extra-large {
    margin-top: ${props => props.theme.marginXL}px;
  }

  .m-t-maxi {
    // @todo check missing margin token
    margin-top: ${props => props.theme.sizeXXL}px;
  }

  .m-b-none {
    margin-bottom: 0;
  }

  .m-b-mini {
    margin-bottom: ${props => props.theme.marginXXS}px;
  }

  .m-b-extra-small {
    margin-bottom: ${props => props.theme.marginXS}px;
  }

  .m-b-small {
    margin-bottom: ${props => props.theme.marginSM}px;
  }

  .m-b-normal {
    margin-bottom: ${props => props.theme.margin}px;
  }

  .m-b-medium {
    margin-bottom: ${props => props.theme.marginMD}px;
  }

  .m-b-large {
    margin-bottom: ${props => props.theme.marginLG}px;
  }

  .m-b-extra-large {
    margin-bottom: ${props => props.theme.marginXL}px;
  }

  .m-b-maxi {
    // @todo check missing margin token
    margin-bottom: ${props => props.theme.sizeXXL}px;
  }

  .m-l-none {
    margin-left: 0;
  }

  .m-l-mini {
    margin-left: ${props => props.theme.marginXXS}px;
  }

  .m-l-extra-small {
    margin-left: ${props => props.theme.marginXS}px;
  }

  .m-l-small {
    margin-left: ${props => props.theme.marginSM}px;
  }

  .m-l-normal {
    margin-left: ${props => props.theme.margin}px;
  }

  .m-l-medium {
    margin-left: ${props => props.theme.marginMD}px;
  }

  .m-l-large {
    margin-left: ${props => props.theme.marginLG}px;
  }

  .m-l-extra-large {
    margin-left: ${props => props.theme.marginXL}px;
  }

  .m-l-maxi {
    // @todo check missing margin token
    margin-left: ${props => props.theme.sizeXXL}px;
  }

  .m-r-none {
    margin-right: 0;
  }

  .m-r-mini {
    margin-right: ${props => props.theme.marginXXS}px;
  }

  .m-r-extra-small {
    margin-right: ${props => props.theme.marginXS}px;
  }

  .m-r-small {
    margin-right: ${props => props.theme.marginSM}px;
  }

  .m-r-normal {
    margin-right: ${props => props.theme.margin}px;
  }

  .m-r-medium {
    margin-right: ${props => props.theme.marginMD}px;
  }

  .m-r-large {
    margin-right: ${props => props.theme.marginLG}px;
  }

  .m-r-extra-large {
    margin-right: ${props => props.theme.marginXL}px;
  }

  .m-r-maxi {
    // @todo check missing margin token
    margin-right: ${props => props.theme.sizeXXL}px;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .w-full {
    width: 100%;
  }

  .max-w-full {
      max-width: 100%;
  }
  
  .min-w-100 {
      min-width: 100px;
  }

  .h-full {
    height: 100%;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }
`
