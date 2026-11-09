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
import { HIDE_BOUNDARY_SELECTOR } from '@Pimcore/modules/app/utils/auto-hide-empty-content/hide-boundary'
import { render, screen } from '@testing-library/react'
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import DataComponentFormItem from './form-item'

// The real Form, providers and styles pull in antd-style (untranspiled ESM), which jest cannot
// load; the item only needs to show the class and label it is given.
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ className, label, children }: { className?: string, label?: React.ReactNode, children?: React.ReactNode }) => (
      <div
        className={ className }
        data-testid="form-item"
      >
        { label }
        { children }
      </div>
    )
  }
}))
jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
const autoHideProps: Array<Record<string, unknown>> = []
jest.mock('@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content', () => ({
  AutoHideEmptyContent: (
    { children, ...props }: { children?: React.ReactNode } & Record<string, unknown>
  ) => {
    autoHideProps.push(props)
    return <>{ children }</>
  }
}))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra', () => ({
  RestoreInheritanceLabelExtraProvider: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style', () => ({
  useInheritanceOverlayStyle: () => undefined
}))
let mockSuppressEmptyLabel = false

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider', () => ({
  useSuppressEmptyFieldLabel: () => mockSuppressEmptyLabel
}))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => undefined
}))
jest.mock('@sdk/utils', () => ({
  isNonEmptyString: (value: unknown) => typeof value === 'string' && value !== ''
}))
jest.mock('./form-item.styles', () => ({
  useStyles: () => ({ styles: { labelAfterControl: 'label-after-control' } })
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: true }) }))
jest.mock('@Pimcore/modules/data-object/components/inheritance-button', () => ({
  InheritanceButton: () => <span />
}))
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <span>{ children }</span>
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ title, children }: { title: string, children?: React.ReactNode }) => <span data-tooltip={ title }>{ children }</span>
}))

const objectDataType = (labelAfterControl: boolean): DynamicTypeObjectDataAbstract => ({
  labelAfterControl,
  inheritedMaskOverlay: false,
  getObjectDataFormItemProps: (props: AbstractObjectDataDefinition) => ({
    className: 'w-full',
    label: (
      <FieldLabel
        label={ props.title }
        name={ props.name }
      />
    )
  }),
  getObjectDataComponent: () => <input type="checkbox" />,
  getEmptyValue: () => null
}) as unknown as DynamicTypeObjectDataAbstract

const renderItem = (labelAfterControl: boolean, title: React.ReactNode = 'Active'): HTMLElement => {
  render(
    <DataComponentFormItem
      _props={ { name: 'active', title } as unknown as AbstractObjectDataDefinition }
      formFieldName={ ['active'] }
      objectDataType={ objectDataType(labelAfterControl) }
      technicalName="active"
    />
  )

  return screen.getByTestId('form-item')
}

describe('DataComponentFormItem', () => {
  beforeEach(() => {
    mockSuppressEmptyLabel = false
  })

  it('lays the label out after the control for a type that asks for it', () => {
    const item = renderItem(true)

    expect(item).toHaveClass('w-full')
    expect(item).toHaveClass('label-after-control')
  })

  it('keeps the label above the control for every other type', () => {
    expect(renderItem(false)).not.toHaveClass('label-after-control')
  })

  it('shows the technical field name when hovering the label', () => {
    renderItem(false)

    expect(screen.getByText('Active').closest('[data-tooltip]')).toHaveAttribute('data-tooltip', 'active')
  })

  // A container that lays out its own children renders no `.ant-space-item`, so
  // the hide helper has to accept their opt-in boundary too. Hardcoding antd's
  // class here let closest() walk past such a container and collapse an outer
  // Space item that still held populated siblings.
  it('collapses on the shared hide boundary, not only on an antd Space item', () => {
    autoHideProps.length = 0

    renderItem(false)

    expect(autoHideProps).toHaveLength(1)
    expect(autoHideProps[0].parentSelector).toBe(HIDE_BOUNDARY_SELECTOR)
    expect(autoHideProps[0].parentSelector).toContain('.ant-space-item')
  })

  // A classification store key label is a node, not a string: it carries the key's title next to
  // the localization indicator. Suppressing it would drop both.
  it('keeps a label whose title is a node while empty labels are suppressed', () => {
    mockSuppressEmptyLabel = true

    renderItem(false, <span>Net weight</span>)

    expect(screen.getByText('Net weight')).toBeInTheDocument()
  })

  it('still suppresses a label with no title at all', () => {
    mockSuppressEmptyLabel = true

    renderItem(false, '')

    expect(screen.queryByText('Active')).not.toBeInTheDocument()
    expect(screen.getByTestId('form-item').querySelector('span')).toBeNull()
  })
})
