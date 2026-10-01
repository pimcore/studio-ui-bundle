/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeDocumentEditableWysiwyg, type WysiwygEditableDefinition } from './dynamic-type-document-editable-wysiwyg'
import { type WysiwygEditableProps } from '../components/wysiwyg-editable/wysiwyg-editable'

jest.mock('@Pimcore/app/config/app-config', () => ({
  appConfig: {
    wysiwyg: {
      defaultEditorConfig: {
        dataObject: {
          modules: {
            toolbar: {
              container: [['data-object-only']]
            }
          }
        },
        document: {
          theme: 'snow',
          modules: {
            toolbar: {
              container: [['bold', 'italic']]
            }
          }
        }
      }
    }
  }
}))

// The component chain behind WysiwygEditable (wysiwyg module, drag and drop, …) is
// irrelevant here — the test only asserts the props the dynamic type passes down.
jest.mock('../components/wysiwyg-editable/wysiwyg-editable', () => ({
  WysiwygEditable: jest.fn(() => null)
}))

jest.mock('@sdk/modules/wysiwyg', () => ({
  WysiwygContext: jest.requireActual('@Pimcore/modules/wysiwyg/interface/wysiwyg').WysiwygContext
}))

const createProps = (config?: WysiwygEditableDefinition['config']): WysiwygEditableDefinition => ({
  id: 'editable-1',
  name: 'content',
  realName: 'content',
  data: null,
  type: 'wysiwyg',
  inherited: false,
  inDialogBox: null,
  defaultFieldWidth: { small: 200, medium: 300, large: 400 },
  config
})

describe('DynamicTypeDocumentEditableWysiwyg', () => {
  const dynamicType = new DynamicTypeDocumentEditableWysiwyg()

  const getEditableProps = (config?: WysiwygEditableDefinition['config']): WysiwygEditableProps =>
    dynamicType.getEditableDataComponent(createProps(config)).props as unknown as WysiwygEditableProps

  it('applies the global document editor config when the editable has no own config', () => {
    const editableProps = getEditableProps()

    expect(editableProps.editorConfig).toEqual({
      theme: 'snow',
      modules: {
        toolbar: {
          container: [['bold', 'italic']]
        }
      }
    })
  })

  it('lets the editable config override the global document defaults', () => {
    const editableProps = getEditableProps({
      width: 500,
      placeholder: 'Type here',
      modules: {
        toolbar: {
          container: [['undo', 'redo'], ['html-edit']]
        }
      }
    })

    expect(editableProps.editorConfig).toEqual({
      theme: 'snow',
      width: 500,
      placeholder: 'Type here',
      modules: {
        toolbar: {
          container: [['undo', 'redo'], ['html-edit']]
        }
      }
    })
    expect(editableProps.width).toBe(500)
    expect(editableProps.placeholder).toBe('Type here')
  })
})
