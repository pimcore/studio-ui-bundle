/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => `translated:${key}` })
}))

jest.mock('../../../layout-related/views/base-view', () => ({
  BaseView: ({ title, children }: { title?: string, children?: React.ReactNode }) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component', () => ({
  ObjectComponent: () => null
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider', () => ({
  CombinedFieldNameProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/panel/panel', () => ({
  Panel: ({ children }: { children?: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: () => null }))
jest.mock('@Pimcore/components/button/button', () => ({ Button: () => null }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItem: () => ({ name: ['technicalAttributes'] })
}))

jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value', () => ({
  useKeyedListContext: () => ({ operations: { remove: jest.fn(), getValue: jest.fn() } })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1 })
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: jest.fn() })
}))

jest.mock('./provider', () => ({
  useClassificationStore: () => ({ isNewGroup: () => false })
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { ClassificationStoreItem } from './classification-store-item'

describe('ClassificationStoreItem', () => {
  it('translates the group name in the panel title', () => {
    const groupLayout = { id: 7, name: 'hydraulic_power', description: null, keys: [] }

    render(
      <ClassificationStoreItem
        classificationStoreName='technicalAttributes'
        currentLayoutData={ [groupLayout] }
        groupLayout={ groupLayout }
        updateCurrentLayoutData={ jest.fn() }
      />
    )

    expect(screen.getByRole('heading').textContent).toBe('translated:hydraulic_power')
  })
})
