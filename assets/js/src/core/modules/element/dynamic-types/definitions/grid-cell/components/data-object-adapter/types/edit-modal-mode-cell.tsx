/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { type AbstractObjectDataDefinition, type WithEditModalGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Form } from '@Pimcore/components/form/form'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { isUndefined } from 'lodash'
import { FieldCollectionProvider } from '../../../../objects/data-related/components/field-collection/providers/field-collection-provider'
import { InheritanceLayer } from '../inheritance-layer'
import { Flex } from '@Pimcore/components/flex/flex'
import { DataObjectProvider } from '@Pimcore/modules/data-object/data-object-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { META_SUPPORTS_BATCH_APPEND_MODE } from '@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode'
import { useTranslation } from 'react-i18next'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useResolvedFieldName } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/utils/resolve-field-name'

export interface EditModalModeCellProps {
  objectCellDefinition: WithEditModalGridCellDefinition
  cellProps: DefaultCellProps
}

interface InlineEditFieldBridgeProps {
  combinedFieldName: string | undefined
  editComponent: React.ReactElement
  value?: unknown
  onChange?: (value: unknown) => void
}

// Lets antd Form.Item see a clean child it can clone with value/onChange.
// We then re-inject those (plus combinedFieldName) into the real editComponent.
const InlineEditFieldBridge = ({ combinedFieldName, editComponent, value, onChange }: InlineEditFieldBridgeProps): React.JSX.Element => {
  return React.cloneElement(editComponent, { combinedFieldName, value, onChange })
}

export const EditModalCell = (props: EditModalModeCellProps): React.JSX.Element => {
  const { decodeColumnIdentifier } = useSelectedColumns()
  const { isInEditMode, fireOnUpdateCellDataEvent, disableEditMode } = useEditMode(props.cellProps)
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { currentLanguage } = useLanguageSelection()

  // Mirror DataComponent: assemble combinedFieldName from the cell context so
  // relation fields can resolve their backend dot-notation in the inline-edit
  // modal too. Done via a wrapper so antd Form.Item clones a clean component
  // and forwards value/onChange to us — we then re-inject everything into the
  // real editComponent below.
  const combinedFieldName = useResolvedFieldName(props.cellProps.column.id, undefined)
  // Stabilize initialValues so antd Form doesn't see a new reference each
  // render — defensive against re-initialisation that could revert user edits.
  const initialFormValues = useMemo(() => ({ value: props.cellProps.getValue() }), [])
  // Same for DataObjectProvider's value — avoid forcing all context consumers
  // to re-render on every parent render.
  const rowDataObjectId = props.cellProps.row.original.id as number

  const onFormFinish = (values): void => {
    fireOnUpdateCellDataEvent(values.value, {
      [META_SUPPORTS_BATCH_APPEND_MODE]: props.objectCellDefinition.supportsBatchAppendModes
    })

    disableEditMode()
  }

  const onCancel = (): void => {
    form.resetFields()
    disableEditMode()
  }
  props.objectCellDefinition.handleDefaultValue?.(props.objectCellDefinition.editComponent.props as AbstractObjectDataDefinition, form, ['value'])

  const column = decodeColumnIdentifier(props.cellProps.column.id)
  const apiColumns = props?.cellProps?.row?.original?.['__api-data']

  const currentApiColumn = apiColumns?.columns?.find((apiColumn) => {
    if (column?.type === 'dataobject.classificationstore') {
      const apiColumnKey = column.key!.split('.')[0]

      if (column?.localizable) {
        return column.key === apiColumnKey && (column.locale ?? currentLanguage) === apiColumn.locale && apiColumn.additionalAttributes.groupId === column.config.groupId && apiColumn.additionalAttributes.keyId === column.config.keyId
      }

      return column.key === apiColumnKey && apiColumn.additionalAttributes.groupId === column.config.groupId && apiColumn.additionalAttributes.keyId === column.config.keyId
    }

    if (column?.localizable === true) {
      return apiColumn.key === column?.key && (column.locale ?? currentLanguage) === apiColumn.locale
    }

    return apiColumn.key === column?.key
  })

  return (
    <Flex className='relative w-full h-full'>
      <InheritanceLayer
        inherited={ currentApiColumn?.inheritance?.inherited === true && !isInEditMode }
        objectId={ currentApiColumn?.inheritance?.objectId }
      >
        {props.objectCellDefinition.previewComponent}
      </InheritanceLayer>

      {isInEditMode && !isUndefined(props.objectCellDefinition.editModalSettings) && (
        <WindowModal
          cancelText={ t('edit-modal.discard') }
          okText={ t('edit-modal.apply-changes') }
          onCancel={ onCancel }
          onOk={ () => { form.submit() } }
          open={ isInEditMode }
          size={ props.objectCellDefinition.editModalSettings.modalSize }
          title={ t('edit-modal.inline-edit') }
        >
          <DataObjectProvider id={ rowDataObjectId }>
            <FieldWidthProvider>
              <FieldCollectionProvider id={ rowDataObjectId }>
                <Form
                  form={ form }
                  initialValues={ initialFormValues }
                  layout={ props.objectCellDefinition.editModalSettings.formLayout }
                  onFinish={ onFormFinish }
                >
                  <Form.Item
                    { ...props.objectCellDefinition.formItemProps }
                    name={ 'value' }
                  >
                    <InlineEditFieldBridge
                      combinedFieldName={ combinedFieldName }
                      editComponent={ props.objectCellDefinition.editComponent }
                    />
                  </Form.Item>
                </Form>
              </FieldCollectionProvider>
            </FieldWidthProvider>
          </DataObjectProvider>
        </WindowModal>
      )}
    </Flex>
  )
}
