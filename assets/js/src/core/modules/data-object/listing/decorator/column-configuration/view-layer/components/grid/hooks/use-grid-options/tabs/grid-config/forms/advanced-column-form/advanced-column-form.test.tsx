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
import { PreviewModeProvider } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { AdvancedColumnForm } from './advanced-column-form'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/form/form', () => {
  const Form = ({ children }: any): React.JSX.Element => <form>{children}</form>
  Form.Item = ({ children }: any): React.JSX.Element => <div>{children}</div>
  Form.Item.displayName = 'FormItem'
  Form.useForm = () => [{ setFieldValue: jest.fn() }]
  return { Form }
})
jest.mock('@Pimcore/components/pipeline/pipeline', () => {
  const Pipeline = ({ items }: any): React.JSX.Element => <div>{items.map((i: any) => <div key={ i.id }>{i.component}</div>)}</div>
  Pipeline.CustomItem = ({ children }: any): React.JSX.Element => <div>{children}</div>
  Pipeline.CustomItem.displayName = 'CustomItem'
  Pipeline.DynamicGroupItem = (): null => null
  Pipeline.DynamicGroupItem.displayName = 'DynamicGroupItem'
  return { Pipeline }
})
jest.mock('@Pimcore/components/pipeline/provider/pipeline-config/pipeline-config-provider', () => ({
  PipelineConfigProvider: ({ children }: any) => <>{children}</>
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/classification-store/classification-store-field-picker-provider', () => ({
  ClassificationStoreFieldPickerProvider: ({ children }: any) => <>{children}</>
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelectionOptional: () => undefined
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/components/tabs/tabs', () => ({ Tabs: () => null }))
jest.mock('@Pimcore/components/split-layout/split-layout', () => ({ SplitLayout: () => null }))
jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: any) => <div>{children}</div> }))
jest.mock('./pipeline-layout-provider', () => ({ usePipelineLayoutContext: () => ({ pipelineLayout: 'default' }) }))

const previewMounted = jest.fn()
jest.mock('./preview/preview', () => ({
  Preview: () => {
    previewMounted()
    return <div data-testid="column-preview" />
  }
}))

const column = { key: 'advanced', type: 'dataobject.advanced' } as any

beforeEach(() => { previewMounted.mockReset() })

describe('AdvancedColumnForm preview wiring', () => {
  it('AC2/AC4: renders no preview and fetches nothing while preview mode is off', () => {
    render(<PreviewModeProvider><AdvancedColumnForm column={ column } /></PreviewModeProvider>)
    expect(screen.queryByTestId('column-preview')).not.toBeInTheDocument()
    expect(previewMounted).not.toHaveBeenCalled()
  })

  it('AC4: renders the preview through the slot while preview mode is on', () => {
    render(<PreviewModeProvider defaultEnabled><AdvancedColumnForm column={ column } /></PreviewModeProvider>)
    expect(screen.getByTestId('column-preview')).toBeInTheDocument()
  })

  it('AC4: showPreview=false still hides the preview while on', () => {
    render(<PreviewModeProvider defaultEnabled><AdvancedColumnForm
      column={ column }
      showPreview={ false }
                                               /></PreviewModeProvider>)
    expect(screen.queryByTestId('column-preview')).not.toBeInTheDocument()
  })
})
