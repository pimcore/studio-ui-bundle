/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render } from '@testing-library/react'
import { type TransformationComponent } from '../types/transformation-component-types'
import { ContainTransformationComponent } from './contain/contain-transformation-component'
import { CoverTransformationComponent } from './cover/cover-transformation-component'
import { FrameTransformationComponent } from './frame/frame-transformation-component'
import { ScaleByHeightTransformationComponent } from './scale-by-height/scale-by-height-transformation-component'
import { ScaleByWidthTransformationComponent } from './scale-by-width/scale-by-width-transformation-component'

const formItemProps: Array<Record<string, any>> = []

// the form barrel transitively imports antd-style (untranspiled ESM) — only the
// props the transformation components pass to Form.Item are of interest here
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: (props: Record<string, any>) => {
      formItemProps.push(props)
      return null
    }
  }
}))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/input-number/input-number', () => ({ InputNumber: () => null }))
jest.mock('@Pimcore/components/select/select', () => ({ Select: () => null }))
jest.mock('@Pimcore/components/switch/switch', () => ({ Switch: () => null }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// numbered lists (field collections) register a field without initial value as null,
// which the thumbnail adapter rejects for its non-nullable bool $forceResize parameter
describe('forceResize default of the resizing transformations', () => {
  beforeEach(() => { formItemProps.length = 0 })

  it.each<[string, TransformationComponent]>([
    ['contain', ContainTransformationComponent],
    ['cover', CoverTransformationComponent],
    ['frame', FrameTransformationComponent],
    ['scaleByHeight', ScaleByHeightTransformationComponent],
    ['scaleByWidth', ScaleByWidthTransformationComponent]
  ])('%s defaults forceResize to false', (_type, Component) => {
    render(<Component />)

    const forceResizeItem = formItemProps.find((props) => props.name === 'forceResize')

    expect(forceResizeItem).toBeDefined()
    expect(forceResizeItem?.initialValue).toBe(false)
  })
})
