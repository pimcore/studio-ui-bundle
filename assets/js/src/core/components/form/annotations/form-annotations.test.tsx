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
import { render, screen } from '@testing-library/react'
import { Form as AntForm } from 'antd'
import { withAnnotation } from '../item/with-annotation'
import { formItemAnnotationKey, FormAnnotationsProvider } from './form-annotations-provider'

// antd-style ships untranspiled ESM; the class names are all the HOC needs from it
jest.mock('../item/with-annotation.styles', () => ({
  useStyles: () => ({
    styles: { annotated: 'annotated', added: 'added', changed: 'changed', removed: 'removed', moved: 'moved' }
  })
}))

const Item = withAnnotation(AntForm.Item)

const renderItem = (annotations: Parameters<typeof FormAnnotationsProvider>[0]['annotations']): Element => {
  render(
    <FormAnnotationsProvider annotations={ annotations }>
      <AntForm>
        <Item
          extra="own extra"
          label="Title"
          name={ ['settings', 'title'] }
        >
          <input />
        </Item>
      </AntForm>
    </FormAnnotationsProvider>
  )

  return screen.getByText('Title').closest('.ant-form-item')!
}

describe('withAnnotation', () => {
  it('leaves an item alone when nothing names it', () => {
    const item = renderItem({ other: { status: 'changed' } })

    expect(item.className).not.toContain('annotated')
    expect(screen.getByText('own extra')).toBeInTheDocument()
  })

  it('tints an annotated item by status and shows the hint above the item\'s own extra', () => {
    const item = renderItem({ 'settings.title': { status: 'changed', hint: 'was: Old title' } })

    expect(item.className).toContain('annotated')
    expect(item.className).toContain('changed')
    expect(screen.getByText('was: Old title')).toBeInTheDocument()
    expect(screen.getByText('own extra')).toBeInTheDocument()
  })

  it('keys array names by their joined path', () => {
    expect(formItemAnnotationKey(['settings', 'title'])).toBe('settings.title')
    expect(formItemAnnotationKey('title')).toBe('title')
    expect(formItemAnnotationKey(undefined)).toBeUndefined()
  })
})
