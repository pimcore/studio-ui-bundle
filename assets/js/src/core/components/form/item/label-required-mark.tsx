/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { type FormProps } from 'antd'
import { Space } from '../../space/space'
import { Text } from '../../text/text'
import { LabelExtra } from './provider/label-extra/label-extra-provider'

export type RequiredMarkRenderer = NonNullable<Extract<FormProps['requiredMark'], (...args: any) => any>>

/**
 * Builds the requiredMark render function the Studio Form passes to Ant: composes a
 * caller's requiredMark with the label-extra slot, which always has to render at the
 * end of the label row. Ant only applies its own CSS-driven asterisk/optional marker
 * when requiredMark is left as a plain value, not a render function, and this always
 * renders through one, so the three plain values are reproduced here: `true`/undefined
 * marks a required field, `'optional'` marks a non-required one instead (Ant's own
 * wording), `false` marks neither.
 *
 * @param optionalMarkText Text shown for the 'optional' mode, e.g. `t('form.optional-mark')`.
 */
export const buildRequiredMark = (
  callerRequiredMark: FormProps['requiredMark'],
  optionalMarkText: ReactNode
): RequiredMarkRenderer => {
  // A named function, not an arrow: it is a render-prop callback handed to Ant, not a
  // component of its own, and the name keeps eslint's react/display-name rule (which
  // otherwise reads any function returning JSX as an unnamed component) from firing.
  return function renderRequiredMark (label, info) {
    let markedLabel: ReactNode

    if (typeof callerRequiredMark === 'function') {
      markedLabel = callerRequiredMark(label, info)
    } else {
      const mark = callerRequiredMark === 'optional'
        ? !info.required && <Text type='secondary'>{optionalMarkText}</Text>
        : info.required && callerRequiredMark !== false && '*'

      markedLabel = (
        <Space size='mini'>
          {label}
          {mark}
        </Space>
      )
    }

    return (
      <>
        {markedLabel}
        <LabelExtra />
      </>
    )
  }
}
