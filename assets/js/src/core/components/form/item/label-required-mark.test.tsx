/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * requiredMark of the Studio Form. It always renders through a render function (the
 * label-extra slot has to be appended after whatever the caller's mark produces), so
 * Ant's own CSS-driven asterisk/optional marker never fires - the three plain values
 * (default, 'optional', false) are reproduced by hand here and must stay in sync with
 * how AntD's own FormItemLabel treats them (see form.tsx).
 */

import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { LabelExtraProvider } from '../item/provider/label-extra/label-extra-provider'
import { buildRequiredMark } from './label-required-mark'

// space.styles imports antd-style (untranspiled ESM), which jest cannot load.
jest.mock('../../space/space.styles', () => ({
  useStyles: () => ({ styles: { rowColGap: 'row-col-gap' } })
}))

const OPTIONAL_TEXT = '(optional)'

const renderMark = (mark: Parameters<typeof buildRequiredMark>[0], required: boolean, extra?: React.ReactNode): { text: string } => {
  const renderer = buildRequiredMark(mark, OPTIONAL_TEXT)
  const label = renderer('Field', { required })

  const { container } = render(
    <LabelExtraProvider extra={ extra }>
      {label}
    </LabelExtraProvider>
  )

  return { text: container.textContent ?? '' }
}

describe('buildRequiredMark', () => {
  afterEach(cleanup)

  it('marks a required field with an asterisk by default', () => {
    expect(renderMark(undefined, true).text).toBe('Field*')
  })

  it('leaves a non-required field alone by default', () => {
    expect(renderMark(true, false).text).toBe('Field')
  })

  it('marks the required field with nothing when set to "optional"', () => {
    expect(renderMark('optional', true).text).toBe('Field')
  })

  it('marks the non-required field instead when set to "optional"', () => {
    expect(renderMark('optional', false).text).toBe(`Field${OPTIONAL_TEXT}`)
  })

  it('marks neither a required nor a non-required field when set to false', () => {
    expect(renderMark(false, true).text).toBe('Field')
    cleanup()
    expect(renderMark(false, false).text).toBe('Field')
  })

  it('lets a render function draw the mark itself, bypassing the built-in ones', () => {
    const text = renderMark((label, { required }) => <span>{label}{required ? '(req)' : '(opt)'}</span>, true).text
    expect(text).toBe('Field(req)')
  })

  it('always appends the label-extra slot after the mark', () => {
    expect(renderMark(undefined, true, <span>extra</span>).text).toBe('Field*extra')
    cleanup()
    expect(renderMark('optional', false, <span>extra</span>).text).toBe(`Field${OPTIONAL_TEXT}extra`)
  })

  it('renders nothing extra when the label-extra slot has nothing to show', () => {
    const { container } = render(
      <LabelExtraProvider extra={ null }>
        {buildRequiredMark(undefined, OPTIONAL_TEXT)('Field', { required: true })}
      </LabelExtraProvider>
    )
    expect(container.textContent).toBe('Field*')
  })
})
