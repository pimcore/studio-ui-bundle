/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { Children, cloneElement, isValidElement } from 'react'
import { HIDE_BOUNDARY_SELECTOR } from '@Pimcore/modules/app/utils/auto-hide-empty-content/hide-boundary'
import { render, screen } from '@testing-library/react'
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { LabelExtra } from '@Pimcore/components/form/item/provider/label-extra/label-extra-provider'
import { type FieldAddons } from './field-addon/use-field-addons'
import DataComponentFormItem from './form-item'

// The real Form, providers and styles pull in antd-style (untranspiled ESM), which jest cannot
// load; the item only needs to show the class and label it is given, end the label row with the
// label extra (as AntD does for an item that has a label) and bind its child the way AntD does, by handing it value and onChange.
const mockOnChange = jest.fn()
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ className, label, children }: { className?: string, label?: React.ReactNode, children?: React.ReactNode }) => {
      const child = Children.only(children)

      return (
        <div
          className={ className }
          data-testid="form-item"
        >
          { label !== null && label !== undefined && (
            <div data-testid="label-row">
              { label }
              <LabelExtra />
            </div>
          ) }
          { isValidElement(child) ? cloneElement(child as React.ReactElement<Record<string, unknown>>, { value: 'bound', onChange: mockOnChange }) : child }
        </div>
      )
    }
  }
}))
let mockFieldAddons: FieldAddons = {}
const fieldAddonCalls: unknown[][] = []
jest.mock('./field-addon/use-field-addons', () => ({
  useFieldAddons: (...args: unknown[]) => {
    fieldAddonCalls.push(args)
    return mockFieldAddons
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
// the restore action is the label extra the field already has; addons go after it
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra', () => {
  const { LabelExtraProvider } = jest.requireActual('@Pimcore/components/form/item/provider/label-extra/label-extra-provider')

  return {
    RestoreInheritanceLabelExtraProvider: ({ children }: { children?: React.ReactNode }) => (
      <LabelExtraProvider extra={ <span>restore</span> }>{ children }</LabelExtraProvider>
    )
  }
})
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

const objectDataType = (labelAfterControl: boolean, rendersFieldAddons = true): DynamicTypeObjectDataAbstract => ({
  labelAfterControl,
  rendersFieldAddons,
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
  getObjectDataComponent: () => (
    <input
      data-testid="control"
      disabled
      readOnly
      type="text"
    />
  ),
  getEmptyValue: () => null
}) as unknown as DynamicTypeObjectDataAbstract

const renderItem = (labelAfterControl: boolean, title: React.ReactNode = 'Active', fieldPath?: Array<string | number>, rendersFieldAddons = true): HTMLElement => {
  render(
    <DataComponentFormItem
      _props={ { name: 'active', title } as unknown as AbstractObjectDataDefinition }
      fieldPath={ fieldPath }
      formFieldName={ ['active'] }
      objectDataType={ objectDataType(labelAfterControl, rendersFieldAddons) }
      technicalName="active"
    />
  )

  return screen.getByTestId('form-item')
}

describe('DataComponentFormItem', () => {
  beforeEach(() => {
    mockSuppressEmptyLabel = false
    mockFieldAddons = {}
    fieldAddonCalls.length = 0
    mockOnChange.mockClear()
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

  describe('field addons', () => {
    it('hands the control to the form item as is when no addon is registered', () => {
      const item = renderItem(false)

      expect(item.querySelector('.pimcore-field-addon')).toBeNull()
      expect(screen.getByTestId('control')).toHaveValue('bound')
    })

    it('asks for the addons of the field by its full path', () => {
      renderItem(false, 'Height', ['attributes', 'Dimensions', 'height'])

      expect(fieldAddonCalls[0][1]).toEqual(['attributes', 'Dimensions', 'height'])
    })

    // e.g. a wrapped field's delegate in the version detail view, which mounts it outside a form
    it('asks for no addons for a field rendered without a path', () => {
      renderItem(false)

      expect(fieldAddonCalls[0][1]).toBeUndefined()
    })

    // containers such as object bricks or blocks: their fields get the addons, not the container
    it('asks for no addons for a type that renders none', () => {
      renderItem(false, 'Attributes', ['attributes'], false)

      expect(fieldAddonCalls[0][1]).toBeUndefined()
    })

    it('renders after and below addons around the control, which stays bound to the form item', () => {
      mockFieldAddons = { after: <span>Manufacturer</span>, below: <span>ERP: 4</span> }

      renderItem(false, 'Active', ['active'])

      const control = screen.getByTestId('control')
      expect(screen.getByText('Manufacturer').closest('.pimcore-field-addon__row')).toContainElement(control)
      expect(screen.getByText('ERP: 4').closest('.pimcore-field-addon__below')).not.toBeNull()
      expect(control).toHaveValue('bound')
      expect(control).toBeDisabled()
    })

    it('ends the label row with the label addon, after the restore action', () => {
      mockFieldAddons = { label: <span>from series</span> }

      renderItem(false, 'Active', ['active'])

      expect(screen.getByTestId('label-row')).toHaveTextContent(/Active.*restore.*from series/)
      expect(screen.getByTestId('control').closest('.pimcore-field-addon')).toBeNull()
    })
  })
})
