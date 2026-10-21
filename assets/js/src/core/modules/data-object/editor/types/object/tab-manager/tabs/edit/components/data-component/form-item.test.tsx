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
import {
  type AbstractObjectDataDefinition,
  type DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import DataComponentFormItem from './form-item'

// The real Form, providers and styles pull in antd-style (untranspiled ESM), which jest cannot
// load; the item only needs to show the class it is given.
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ className, children }: { className?: string, children?: React.ReactNode }) => (
      <div
        className={ className }
        data-testid="form-item"
      >
        { children }
      </div>
    )
  }
}))
jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content', () => ({
  AutoHideEmptyContent: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra', () => ({
  RestoreInheritanceLabelExtraProvider: ({ children }: { children?: React.ReactNode }) => <>{ children }</>
}))
jest.mock('@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style', () => ({
  useInheritanceOverlayStyle: () => undefined
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider', () => ({
  useSuppressEmptyFieldLabel: () => false
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

const objectDataType = (labelAfterControl: boolean): DynamicTypeObjectDataAbstract => ({
  labelAfterControl,
  inheritedMaskOverlay: false,
  getObjectDataFormItemProps: () => ({ className: 'w-full' }),
  getObjectDataComponent: () => <input type="checkbox" />,
  getEmptyValue: () => null
}) as unknown as DynamicTypeObjectDataAbstract

const renderItem = (labelAfterControl: boolean): HTMLElement => {
  render(
    <DataComponentFormItem
      _props={ { name: 'active', title: 'Active' } as unknown as AbstractObjectDataDefinition }
      formFieldName={ ['active'] }
      objectDataType={ objectDataType(labelAfterControl) }
    />
  )

  return screen.getByTestId('form-item')
}

describe('DataComponentFormItem', () => {
  it('lays the label out after the control for a type that asks for it', () => {
    const item = renderItem(true)

    expect(item).toHaveClass('w-full')
    expect(item).toHaveClass('label-after-control')
  })

  it('keeps the label above the control for every other type', () => {
    expect(renderItem(false)).not.toHaveClass('label-after-control')
  })
})
