import { Flex } from "@Pimcore/components/flex/flex";
import { Form } from "@Pimcore/components/form/form";
import { Input } from "@Pimcore/components/input/input";
import { Modal } from "@Pimcore/components/modal/modal";
import { ModalTitle } from "@Pimcore/components/modal/modal-title/modal-title";
import { TextArea } from "@Pimcore/components/textarea/textarea";
import { isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { BundleApplicationLoggerLogEntryWithActions } from "../table/table";
import { ManyToOneRelation, ManyToOneRelationValueType } from "@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation";
import { FieldWidthProvider } from "@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider";

interface DetailModalProps {
  data: BundleApplicationLoggerLogEntryWithActions | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DetailModal = (props: DetailModalProps): React.JSX.Element => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  if (isNil(props.data)) {
    return <></>
  }

  const closeModel = (): void => {
    props.setOpen(false);
  }

  const formData = {
    date: props.data.date ?? '',
    message: props.data.message ?? '',
    priority: props.data.priority ?? '',
    component: props.data.component ?? '',
    source: props.data.source ?? '',
    fileObject: {
      fullPath: "/Product Data/Body-Styles/2-door roadster",
      id: 6,
      isPublished: true,
      subtype: "object",
      type: "object"
    } as ManyToOneRelationValueType,
  }

  return (
    <Modal
      open={props.open}
      onClose={closeModel}
      onCancel={closeModel}
      onOk={closeModel}
      title={(
        <ModalTitle>
          {t('application-logger.detail-modal.title')}
        </ModalTitle>
      )}
    >
      <FieldWidthProvider>
        <Form
          layout="vertical"
          form={form}
          initialValues={formData}
        >
          <Form.Item
            label={t('application-logger.columns.timestamp')}
            name="date"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={t('application-logger.columns.message')}
            name="message"
          >
            <TextArea readOnly />
          </Form.Item>

          <Form.Item
            label={t('application-logger.columns.type')}
            name="priority"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={t('application-logger.columns.component')}
            name="component"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={t('application-logger.columns.source')}
            name="source"
          >
            <Input readOnly />
          </Form.Item>

          {props.data.fileObject && (
            <Form.Item
              label={t('application-logger.columns.related-object')}
              name={'fileObject'}
            >
              <ManyToOneRelation
                readOnly
                assetsAllowed
                dataObjectsAllowed
                documentsAllowed
              />
            </Form.Item>
          )}
        </Form>
      </FieldWidthProvider>
    </Modal>
  )
}