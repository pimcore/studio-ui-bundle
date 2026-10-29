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
import { ObjectLocalizedFields, type ObjectLocalizedFieldsProps } from './object-localized-fields'

// The providers and the Form barrel transitively import antd-style (untranspiled
// ESM), which jest cannot load — same reason as field-container.test.tsx. They are
// replaced by passthrough elements; none of them take part in the title/border
// decision, which stays with the real BaseView below.
jest.mock('@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider', () => ({
  LocalizedFieldsProvider: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider', () => ({
  CombinedFieldNameProvider: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Group: ({ children }: any) => <div>{children}</div>
  }
}))

jest.mock('@Pimcore/components/space/space', () => ({
  Space: ({ children, className, style }: any) => (
    <div
      className={ className }
      data-testid='children'
      style={ style }
    >
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({
    currentLanguage: 'en',
    hasLocalizedFields: true,
    setHasLocalizedFields: jest.fn()
  })
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => ({
  ObjectComponent: ({ name }: any) => <div>{name}</div>
}))

// The real BaseView is kept — it owns the decision of whether a titled/bordered
// wrapper is rendered at all. Only its leaf renderers and the icon/flex barrels
// are replaced, so the assertions below exercise production logic, not a mock.
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/views/card-view', () => ({
  CardView: ({ children, title, bordered }: any) => (
    <div
      data-bordered={ bordered === true ? 'true' : 'false' }
      data-testid='card-view'
    >
      <span data-testid='card-title'>{title}</span>
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/views/accordion-view', () => ({
  AccordionView: ({ children, title }: any) => (
    <div data-testid='accordion-view'>
      <span data-testid='card-title'>{title}</span>
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children, className, flex, style, vertical }: any) => (
    <div
      className={ className }
      data-flex={ flex ?? '' }
      data-testid={ flex === undefined ? 'flex-container' : 'flex-item' }
      data-vertical={ vertical === true ? 'true' : 'false' }
      style={ style }
    >
      {children}
    </div>
  )
}))

// The provider itself is covered by label-layout-provider.test.tsx; here it only
// has to show which values the container hands it.
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/label-layout-provider', () => ({
  LabelLayoutProvider: ({ children, labelAlign, labelWidth }: any) => (
    <div
      data-label-align={ labelAlign ?? '' }
      data-label-width={ labelWidth ?? '' }
      data-testid='label-layout'
    >
      {children}
    </div>
  )
}))

// Localizedfields::$width and ::$height are offered in the class editor and are
// spread into the component with the rest of the definition node — the props
// interface does not declare them yet, so the test carries the types.
interface ContainerSettingsProps {
  width?: number | string | null
  height?: number | string | null
  layout?: string | null
  labelWidth?: number | null
  labelAlign?: string | null
}

describe('ObjectLocalizedFields', () => {
  const child = (name: string): any => ({ name, datatype: 'data', fieldtype: 'input' })

  const renderLocalizedFields = (props: Partial<ObjectLocalizedFieldsProps> & ContainerSettingsProps = {}): HTMLElement => {
    const { container } = render(
      <ObjectLocalizedFields
        { ...props as ObjectLocalizedFieldsProps }
        name='localizedfields'
      />
    )

    return container
  }

  const defaultChildren = [child('firstname'), child('lastname')]

  // The sizing may legitimately land on the Space, on a wrapper around it, or on
  // both — the class definition only promises that the container ends up that
  // size, so the whole rendered tree is searched instead of one fixed element.
  const sizedElements = (container: HTMLElement, width: string, height: string): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>('*'))
      .filter((element) => element.style.width === width && element.style.height === height)

  // Localizedfields::$border defaults to false and $title to null, which is what
  // an untouched class definition sends — the children must stay flat.
  it('renders the children without a wrapper when neither title nor border is set', () => {
    renderLocalizedFields({ children: defaultChildren })

    expect(screen.queryByTestId('card-view')).toBeNull()
    expect(screen.queryByText('firstname')).not.toBeNull()
    expect(screen.queryByText('lastname')).not.toBeNull()
  })

  it('renders a bordered wrapper when border is enabled', () => {
    renderLocalizedFields({ children: defaultChildren, border: true })

    const wrapper = screen.getByTestId('card-view')

    expect(wrapper.getAttribute('data-bordered')).toBe('true')
    // border alone must not produce a header — an absent title has to stay absent
    // rather than surface as a stringified undefined/null
    expect(screen.getByTestId('card-title').textContent).toBe('')
    expect(screen.queryByText('firstname')).not.toBeNull()
  })

  it('renders the configured title', () => {
    renderLocalizedFields({ children: defaultChildren, title: 'Localized data' })

    expect(screen.getByTestId('card-view')).not.toBeNull()
    expect(screen.getByTestId('card-title').textContent).toBe('Localized data')
  })

  it('renders the title inside the bordered wrapper when both are set', () => {
    renderLocalizedFields({ children: defaultChildren, title: 'Localized data', border: true })

    const wrapper = screen.getByTestId('card-view')

    expect(wrapper.getAttribute('data-bordered')).toBe('true')
    expect(screen.getByTestId('card-title').textContent).toBe('Localized data')
    expect(screen.queryByText('firstname')).not.toBeNull()
  })

  // An empty title is what the class definition sends for an untouched field —
  // it must not produce an empty titled wrapper.
  it('treats an empty title as unset', () => {
    renderLocalizedFields({ children: defaultChildren, title: '' })

    expect(screen.queryByTestId('card-view')).toBeNull()
  })

  // Localizedfields::$width and ::$height are persisted by the class editor and
  // reach the renderer intact, so the container has to be sized by them — the
  // sibling FieldContainer already applies its own the same way. Neither title
  // nor border is set here, which is the common case: the sizing has to survive
  // BaseView rendering the children bare.
  it('applies the configured width and height to the container', () => {
    const container = renderLocalizedFields({ children: defaultChildren, width: 400, height: 200 })

    expect(sizedElements(container, '400px', '200px').length).toBeGreaterThan(0)
    expect(screen.queryByText('firstname')).not.toBeNull()
    expect(screen.queryByText('lastname')).not.toBeNull()
  })

  // Localizedfields::$layout offers only '' and 'fit' in the class editor. 'fit'
  // is the legacy ExtJS layout whose children fill the container, which the
  // sibling FieldContainer already expresses as flex-1 items.
  it('stretches the children to fill the container when the layout is fit', () => {
    renderLocalizedFields({ children: defaultChildren, layout: 'fit', height: 300 })

    const items = screen.getAllByTestId('flex-item')

    expect(items).toHaveLength(2)
    items.forEach((item) => {
      expect(item.dataset.flex).toBe('1')
    })
    expect(screen.getByTestId('flex-container').dataset.vertical).toBe('true')
  })

  it('sizes the fit container with the configured width and height', () => {
    const container = renderLocalizedFields({ children: defaultChildren, layout: 'fit', width: 400, height: 200 })

    expect(sizedElements(container, '400px', '200px').length).toBeGreaterThan(0)
  })

  // An unset or empty layout keeps the stacked Space rendering that every
  // existing class definition already gets.
  it.each([
    ['unset', undefined],
    ['empty', '']
  ])('keeps the stacked rendering when the layout is %s', (_name, layout) => {
    renderLocalizedFields({ children: defaultChildren, layout })

    expect(screen.queryByTestId('flex-item')).toBeNull()
    expect(screen.queryByTestId('children')).not.toBeNull()
  })

  // Localizedfields::$labelWidth and ::$labelAlign are container settings that
  // have to reach the fields inside it, which is what the provider is for.
  it('publishes the configured label layout to its children', () => {
    renderLocalizedFields({ children: defaultChildren, labelWidth: 150, labelAlign: 'left' })

    const provider = screen.getByTestId('label-layout')

    expect(provider.dataset.labelWidth).toBe('150')
    expect(provider.dataset.labelAlign).toBe('left')
    expect(screen.queryByText('firstname')).not.toBeNull()
  })

  it('publishes a top alignment as well', () => {
    renderLocalizedFields({ children: defaultChildren, labelAlign: 'top' })

    expect(screen.getByTestId('label-layout').dataset.labelAlign).toBe('top')
  })

  // Nothing configured must not change how a field's label is rendered, so the
  // container does not wrap its children in a provider at all.
  it('does not publish a label layout when neither setting is configured', () => {
    renderLocalizedFields({ children: defaultChildren })

    expect(screen.queryByTestId('label-layout')).toBeNull()
  })
})
