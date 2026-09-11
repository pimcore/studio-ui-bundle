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
    styles: { tag: 'tag', tagOnControlRow: 'tag-on-control-row' }
  })
}))

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// the Studio Tag reaches antd-style through Icon; the word it carries is what matters here
jest.mock('@Pimcore/components/tag/tag', () => ({
  Tag: ({ children, className }: any) => <span className={ className }>{children}</span>
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

    expect(screen.queryByText('form.annotation.changed')).not.toBeInTheDocument()
    expect(item.className).not.toContain('pimcore-form-item-annotated')
    expect(screen.getByText('own extra')).toBeInTheDocument()
  })

  it('tags an annotated item\'s label and shows the hint above the item\'s own extra', () => {
    const item = renderItem({ 'settings.title': { status: 'changed', hint: 'was: Old title' } })

    expect(item.className).toContain('pimcore-form-item-annotated')
    expect(item.className).toContain('pimcore-form-item-annotated--changed')
    expect(screen.getByText('form.annotation.changed').closest('.ant-form-item-label')).not.toBeNull()
    expect(screen.getByText('was: Old title')).toBeInTheDocument()
    expect(screen.getByText('own extra')).toBeInTheDocument()
  })

  it('puts the tag in the extra slot when the item carries its text on the control', () => {
    render(
      <FormAnnotationsProvider annotations={ { toggled: { status: 'added' } } }>
        <AntForm>
          <Item name="toggled">
            <input />
          </Item>
        </AntForm>
      </FormAnnotationsProvider>
    )

    const tag = screen.getByText('form.annotation.added')

    expect(tag.closest('.ant-form-item-extra')).not.toBeNull()
    expect(tag.closest('.ant-form-item-label')).toBeNull()
    expect(tag.closest('.ant-form-item')!.className).toContain('tag-on-control-row')
  })

  it('keys array names by their joined path', () => {
    expect(formItemAnnotationKey(['settings', 'title'])).toBe('settings.title')
    expect(formItemAnnotationKey('title')).toBe('title')
    expect(formItemAnnotationKey(undefined)).toBeUndefined()
  })
})
