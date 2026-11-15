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
import { compose } from '@reduxjs/toolkit'
import { withGroupName } from '../item/with-group-name'
import { withKeyedItemContext } from '../item/with-keyed-item-context'
import { withNumberedItemContext } from '../item/with-numbered-item-context'
import { withItemProvider } from '../item/with-item-provider'
import { withAnnotation } from '../item/with-annotation'
import { FormGroupProvider } from '../group/provider/form-group-provider'
import { FormAnnotationsProvider } from './form-annotations-provider'

// antd-style ships untranspiled ESM; the class names are all the HOC needs from it
jest.mock('../item/with-annotation.styles', () => ({
  useStyles: () => ({ styles: { tag: 'tag', tagOnControlRow: 'tag-on-control-row' } })
}))

// the keyed-item HOC reaches the style factory through virtual-item
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => {
  const cx = (...args: any[]): string => args.filter(Boolean).join(' ')

  return {
    createStyles: () => () => ({ styles: new Proxy({}, { get: (_t, key) => String(key) }), cx, theme: {} }),
    css: () => '',
    cx,
    keyframes: () => ''
  }
})

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('@Pimcore/components/tag/tag', () => ({
  Tag: ({ children, className }: any) => <span className={ className }>{children}</span>
}))

// form.tsx's chain, same order, minus withLocalizedFieldsLocale — importing that one pulls the
// router and the sdk barrel into jest. withGroupName is the HOC that rewrites `name`, so the
// ordering question this asserts is the same one.
const Item = compose(
  withGroupName,
  withKeyedItemContext,
  withNumberedItemContext,
  withItemProvider,
  withAnnotation
)(AntForm.Item)

const renderGrouped = (annotations: Record<string, { status: 'added' | 'changed' | 'removed' | 'moved' }>): Element => {
  render(
    <FormAnnotationsProvider annotations={ annotations }>
      <AntForm>
        <FormGroupProvider name="settings">
          <Item
            label="Title"
            name="title"
          >
            <input />
          </Item>
        </FormGroupProvider>
      </AntForm>
    </FormAnnotationsProvider>
  )

  return screen.getByText('Title').closest('.ant-form-item')!
}

describe('annotations through the composed Form.Item chain', () => {
  it('keys a grouped item by its resolved path, not the name it was written with', () => {
    const item = renderGrouped({ 'settings.title': { status: 'changed' } })

    expect(item.className).toContain('pimcore-form-item-annotated--changed')
    expect(screen.getByText('form.annotation.changed')).toBeInTheDocument()
  })

  it('leaves a grouped item alone when only its unresolved name is annotated', () => {
    const item = renderGrouped({ title: { status: 'changed' } })

    expect(item.className).not.toContain('pimcore-form-item-annotated')
  })
})
