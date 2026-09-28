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
import { fireEvent, render, screen } from '@testing-library/react'
import { NumberedList } from '@Pimcore/components/form/controls/numbered-list/numbered-list'
import { Group } from '@Pimcore/components/form/group/group'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import { VideoModalProvider } from '@Pimcore/modules/element/components/video-modal/provider/video-modal-provider'
import { VideoFooter } from './footer'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style ships untranspiled ESM. Styling is irrelevant to this behaviour.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: jest.fn(), theme: {} }),
  css: jest.fn(),
  cx: jest.fn(),
  keyframes: jest.fn()
}))

jest.mock('@Pimcore/components/select/select', () => ({
  Select: (props: {
    disabled?: boolean
    onChange?: (value: string) => void
    options?: Array<{ label: string, value: string }>
    value?: string
  }) => (
    <select
      disabled={ props.disabled }
      onChange={ event => props.onChange?.(event.target.value) }
      value={ props.value }
    >
      {props.options?.map(option => (
        <option
          key={ option.value }
          value={ option.value }
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation', () => ({
  ManyToOneRelation: () => <div />
}))

// Preserve the numbered/group-aware Form.Item without loading the complete app graph.
jest.mock('@Pimcore/components/form/item/virtual-item', () => {
  const { ItemProvider: Provider } = jest.requireActual('@Pimcore/components/form/item/provider/item/item-provider')

  return {
    VirtualItem: ({ children, ...item }: { children: React.ReactNode, name?: string }) => (
      <Provider item={ item }>{children}</Provider>
    )
  }
})

jest.mock('@Pimcore/components/form/form', () => {
  const { Form: FormComponent } = jest.requireActual('antd')
  const { Group: FormGroup } = jest.requireActual('@Pimcore/components/form/group/group')
  const { withGroupName } = jest.requireActual('@Pimcore/components/form/item/with-group-name')
  const { withNumberedItemContext } = jest.requireActual('@Pimcore/components/form/item/with-numbered-item-context')

  const Form = (props: React.ComponentProps<typeof FormComponent>): React.JSX.Element => (
    <FormComponent { ...props } />
  )

  Form.Item = withGroupName(withNumberedItemContext(FormComponent.Item))
  Form.Group = FormGroup
  Form.useForm = FormComponent.useForm

  return { Form }
})

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: (props: { disabled?: boolean, icon: { value: string }, onClick?: () => void }) => (
    <button
      aria-label={ props.icon.value }
      disabled={ props.disabled }
      onClick={ props.onClick }
      type='button'
    />
  )
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/modal/window-modal/window-modal', () => ({
  WindowModal: (props: { children: React.ReactNode, onOk: () => void, open: boolean }) => props.open
    ? (
      <div role='dialog'>
        {props.children}
        <button
          onClick={ props.onOk }
          type='button'
        >
          save
        </button>
      </div>
      )
    : null
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: jest.fn() })
}))

describe('VideoFooter', () => {
  it('saves a parsed YouTube ID from a modal opened inside a field collection', () => {
    const onChange = jest.fn()

    render(
      <VideoModalProvider>
        <ItemProvider item={ { name: 'fieldCollection' } }>
          <NumberedList value={ [] }>
            <Group name={ [0, 'data'] }>
              <VideoFooter
                allowedVideoTypes={ ['youtube'] }
                onSave={ onChange }
                value={ { type: 'youtube', data: '' } }
              />
            </Group>
          </NumberedList>
        </ItemProvider>
      </VideoModalProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'edit' }))
    fireEvent.change(screen.getByPlaceholderText('video.url'), {
      target: { value: 'https://www.youtube.com/watch?v=LJo3EQhQ-aM' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'save' }))

    expect(onChange).toHaveBeenCalledWith({
      type: 'youtube',
      data: 'LJo3EQhQ-aM'
    })
  })
})
