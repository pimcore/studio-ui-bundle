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
import { render } from '@testing-library/react'
import { HIDE_BOUNDARY_SELECTOR } from '@Pimcore/modules/app/utils/auto-hide-empty-content/hide-boundary'

// Everything this component pulls in reaches antd-style's untranspiled ESM, which
// jest cannot parse. Only the hide helper's props are under test here, so the rest
// are passthrough stand-ins.
const autoHideProps: Array<Record<string, unknown>> = []

jest.mock('@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content', () => ({
  AutoHideEmptyContent: (
    { children, ...props }: { children?: React.ReactNode } & Record<string, unknown>
  ) => {
    autoHideProps.push(props)
    return <div>{children}</div>
  }
}))

jest.mock('@Pimcore/components/form/form', () => ({
  Form: { Item: ({ children }: any) => <div>{children}</div> }
}))

jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style', () => ({
  useInheritanceOverlayStyle: () => ''
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider', () => ({
  useSuppressEmptyFieldLabel: () => false
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => null
}))

jest.mock('@sdk/utils', () => ({
  isNonEmptyString: (value: unknown) => typeof value === 'string' && value.trim() !== ''
}))

// eslint-disable-next-line import/first
import DataComponentFormItem from './form-item'

describe('DataComponentFormItem', () => {
  // A container that lays out its own children renders no `.ant-space-item`, so
  // the helper has to accept their opt-in boundary too. Hardcoding antd's class
  // here let closest() walk past such a container and collapse an outer Space
  // item holding populated siblings.
  it('collapses on the shared hide boundary, not only on an antd Space item', () => {
    autoHideProps.length = 0

    const objectDataType = {
      getObjectDataFormItemProps: () => ({}),
      getObjectDataComponent: () => <input />,
      inheritedMaskOverlay: false
    } as any

    render(
      <DataComponentFormItem
        _props={ { name: 'firstname' } as any }
        formFieldName={ ['firstname'] }
        objectDataType={ objectDataType }
      />
    )

    expect(autoHideProps).toHaveLength(1)
    expect(autoHideProps[0].parentSelector).toBe(HIDE_BOUNDARY_SELECTOR)
    expect(autoHideProps[0].parentSelector).toContain('.ant-space-item')
  })
})
