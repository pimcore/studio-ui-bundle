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
import { StyleProvider } from '@ant-design/cssinjs'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { EditTagModal } from './edit-tag-modal'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The Studio form controls wrap the AntD ones, but their `.styles` files reach antd-style's
// untranspiled ESM and their import tree pulls in the whole app. The AntD controls they wrap stand
// in for them, so the form, the name input and the destination select behave as they do in the app.
jest.mock('@Pimcore/components/form/form', () => {
  const { Form: AntForm } = jest.requireActual('antd')
  return { Form: AntForm }
})
jest.mock('@Pimcore/components/input/input', () => {
  const { Input: AntInput } = jest.requireActual('antd')
  return { Input: AntInput }
})
jest.mock('@Pimcore/components/select/select', () => {
  const { Select: AntSelect } = jest.requireActual('antd')
  return { Select: AntSelect }
})

jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children, footer }: { children: React.ReactNode, footer: React.ReactNode }) => (
    <div>{children}{footer}</div>
  )
}))
jest.mock('@Pimcore/components/modal/footer/modal-footer', () => ({
  ModalFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// AntD's own default, so the footer button is no submit button of the form either, as in the app.
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children?: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

const rootTag = { id: 0, text: 'All Tags', parentId: 0, children: [], hasChildren: true, path: '/All Tags', iconName: 'folder' } as unknown as Tag

const tag = (id: number, text: string, parentId: number, children: Tag[] = []): Tag =>
  ({ id, text, parentId, children, hasChildren: children.length > 0, path: '', iconName: '' }) as unknown as Tag

const germany = tag(3, 'Germany', 2)
const countries = tag(2, 'Countries', 0, [germany])
const quality = tag(4, 'Quality', 0)

const renderModal = (props: Partial<React.ComponentProps<typeof EditTagModal>> = {}): { onSave: jest.Mock } => {
  const onSave = jest.fn().mockResolvedValue(undefined)

  // AntD's own stylesheet carries selectors jsdom cannot parse, and it reads the stylesheets of the
  // document whenever a computed style is asked for. Collecting them outside the document keeps
  // them out of its way.
  render(
    <StyleProvider container={ document.createElement('div') }>
      <EditTagModal
        moveTargetsFailed={ false }
        moveTargetsLoading={ false }
        onCancel={ jest.fn() }
        onSave={ onSave }
        rootTag={ rootTag }
        tag={ germany }
        tags={ [countries, quality] }
        { ...props }
      />
    </StyleProvider>
  )

  return { onSave }
}

// The name field is reached without a pointer: AntD's injected stylesheet carries selectors jsdom
// cannot parse, and every pointer action in user-event reads the computed style.
const focusNameField = (): void => {
  const nameField = screen.getByLabelText('tag-configuration.name')
  act(() => { nameField.focus() })
}

describe('EditTagModal', () => {
  it('saves on Enter in the name field, as the rename dialog did', async () => {
    const { onSave } = renderModal()

    focusNameField()
    await userEvent.keyboard('{Control>}a{/Control}Bayern{Enter}')

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({ name: 'Bayern', parentId: 2 })
    })
  })

  // Enter reaches no submit button of its own: the Save button sits in the modal footer, outside
  // the form, and the destination select contributes a second input to it.
  it('leaves the form to the explicit handler rather than to implicit submission', () => {
    renderModal()

    const form = screen.getByLabelText('tag-configuration.name').closest('form')

    expect(form?.querySelectorAll('input')).toHaveLength(2)
    expect(form?.querySelector('button[type="submit"], input[type="submit"]')).toBeNull()
  })

  it('does not save on Enter while the name is empty', async () => {
    const { onSave } = renderModal()

    focusNameField()
    await userEvent.keyboard('{Control>}a{/Control}{Backspace}{Enter}')

    await screen.findByText('tag-configuration.name-required')
    expect(onSave).not.toHaveBeenCalled()
  })

  it('holds the destinations closed while they are still loading', () => {
    renderModal({ moveTargetsLoading: true })

    expect(screen.getByLabelText('tag-configuration.move-under')).toBeDisabled()
    expect(screen.queryByText('tag-configuration.move-targets-failed')).not.toBeInTheDocument()
  })

  it('names the failure and still allows a rename when the destinations cannot be loaded', async () => {
    const { onSave } = renderModal({ moveTargetsFailed: true })

    expect(screen.getByLabelText('tag-configuration.move-under')).toBeDisabled()
    expect(screen.getByLabelText('tag-configuration.move-under'))
      .toHaveAccessibleDescription('tag-configuration.move-targets-failed')

    focusNameField()
    await userEvent.keyboard('{Control>}a{/Control}Bayern{Enter}')

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({ name: 'Bayern', parentId: 2 })
    })
  })
})
