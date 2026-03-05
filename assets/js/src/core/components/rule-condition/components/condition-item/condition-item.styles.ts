/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'
import { CONDITION_ANIMATION_DURATION } from '../../rule-condition.constants'

export const useStyles = createStyles(({ token, css }) => {
  const borderPseudoElements = css`
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
    }
    
    &::before {
      left: 0;
    }
    
    &::after {
      right: 0;
    }
  `

  return {
    conditionItemWrapper: css`
      position: relative;
      padding-left: ${token.paddingXS}px;
      padding-right: ${token.paddingXS}px;
      ${borderPseudoElements}
    `,

    conditionItemWrapperNew: css`
      animation: slideInFade ${CONDITION_ANIMATION_DURATION}ms ease-in-out;
      
      @keyframes slideInFade {
        0% {
          opacity: 0;
          transform: translateY(-12px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,

    borderLevel1: css`
      ${borderPseudoElements}
      &::before,
      &::after {
        background-color: ${token.colorPrimaryBorder};
      }
    `,

    borderLevel2: css`
      ${borderPseudoElements}
      &::before,
      &::after {
        background-color: ${token.colorAccent};
      }
    `,

    borderLevel3: css`
      ${borderPseudoElements}
      &::before,
      &::after {
        background-color: ${token.colorAccentSecondary};
      }
    `,

    conditionBoxWrapper: css`
      flex: 1;
      min-width: 0;
    `,

    conditionFormContainer: css`
      width: 100%;
    `
  }
})
