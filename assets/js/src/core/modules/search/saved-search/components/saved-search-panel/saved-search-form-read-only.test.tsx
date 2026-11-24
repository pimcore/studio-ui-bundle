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
import { Form, Input, Switch } from 'antd'
import { SavedSearchForm } from './saved-search-form'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('./saved-search-panel.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/modules/search/provider/use-panel-draft-publisher', () => ({ usePanelDraftPublisher: () => jest.fn() }))
jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({ useUserGetShareCollectionQuery: () => ({ data: { items: [] } }) }))
jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({ useRoleGetShareCollectionQuery: () => ({ data: { items: [] } }) }))
jest.mock('@Pimcore/components/users-roles-dropdown/users-roles-dropdown', () => ({ UsersRolesDropdown: () => null }))
jest.mock('@Pimcore/components/tag-list/tag-list', () => ({ TagList: () => null }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: any) => <div>{children}</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: any) => <span>{children}</span> }))
// the form's controls as antd draws them, without the app's wrappers
jest.mock('@Pimcore/components/input/input', () => ({ Input: (props: any) => <MockInput { ...props } /> }))
jest.mock('@Pimcore/components/textarea/textarea', () => ({ TextArea: (props: any) => <MockTextArea { ...props } /> }))
jest.mock('@Pimcore/components/switch/switch', () => ({ Switch: ({ labelLeft, labelRight, ...props }: any) => <>{labelLeft}<MockSwitch { ...props } />{labelRight}</> }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: mockForm() }))

const MockInput = (props: any): React.JSX.Element => <Input { ...props } />
const MockTextArea = (props: any): React.JSX.Element => <Input.TextArea { ...props } />
const MockSwitch = (props: any): React.JSX.Element => <Switch { ...props } />
function mockForm (): any {
  const { Form: AntForm } = jest.requireActual('antd')
  const Wrapped = (props: any): React.JSX.Element => <AntForm { ...props } />
  return Object.assign(Wrapped, AntForm, { Conditional: () => null })
}

const Harness = ({ readOnly }: { readOnly?: boolean }): React.JSX.Element => {
  const [form] = Form.useForm()

  return (
    <SavedSearchForm
      form={ form as any }
      isSharedGlobally={ false }
      onSharedGloballyChange={ jest.fn() }
      onUsersRolesChange={ jest.fn() }
      readOnly={ readOnly }
      sharedRoles={ [] }
      sharedUsers={ [] }
      showSharing
    />
  )
}

describe('the saved-search panel in a read-only listing', () => {
  it('shows name, description and sharing without letting them change', () => {
    render(<Harness readOnly />)

    expect(screen.getByTestId('saved-search-name-input')).toBeDisabled()
    expect(screen.getByTestId('saved-search-description-input')).toBeDisabled()
    for (const toggle of screen.getAllByRole('switch')) expect(toggle).toBeDisabled()
    expect(screen.queryByText('button.add-edit')).not.toBeInTheDocument()
  })

  it('keeps them editable otherwise', () => {
    render(<Harness />)

    expect(screen.getByTestId('saved-search-name-input')).toBeEnabled()
    expect(screen.getByTestId('saved-search-description-input')).toBeEnabled()
    for (const toggle of screen.getAllByRole('switch')) expect(toggle).toBeEnabled()
    expect(screen.getByText('button.add-edit')).toBeInTheDocument()
  })
})
