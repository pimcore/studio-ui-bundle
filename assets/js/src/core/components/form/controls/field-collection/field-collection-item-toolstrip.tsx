import React from "react";
import { ToolStrip } from "../../../toolstrip/tool-strip";
import { useFieldCollection } from "./field-collection-provider";
import { useNumberedList } from "../numbered-list/provider/numbered-list/use-numbered-list";
import { useTranslation } from "react-i18next";
import { IconButton } from "../../../icon-button/icon-button";
import { Space } from "../../../space/space";
import { FieldCollectionAddControl } from "./field-collection-add-control";

export interface FieldCollectionItemToolStripProps {
  field: number
}

export const FieldCollectionItemToolStrip = (props: FieldCollectionItemToolStripProps): React.JSX.Element => {
  const { field } = props;
  const { values, getValueByKey, operations } = useNumberedList();
  const value = getValueByKey(field.toString());
  const type = value?.type;
  const { registry, maxItems, disallowAddRemove, disallowReorder } = useFieldCollection();
  const registryItem = registry.getItemByType(type);
  const { t } = useTranslation();
  const hasMaxItems = maxItems !== undefined && values.length >= maxItems;

  if (registryItem === undefined) {
    throw new Error(`No registry item found for type "${type}"`);
  }

  return (
    <ToolStrip title={t(registryItem.translationKey)}>
      <FieldCollectionAddControl field={field} disabled={hasMaxItems || disallowAddRemove} />

      <Space size="mini">
        <IconButton
          icon={ { value: 'move-down' } }
          size="small"
          onClick={() => operations.move(field, field + 1)}
          disabled={disallowReorder}
        />

        <IconButton
          icon={ { value: 'move-up' } }
          size="small"
          onClick={() => operations.move(field, field - 1)}
          disabled={disallowReorder}
        />
      </Space>

      <IconButton
        icon={ { value: 'trash' } }
        size="small"
        onClick={() => operations.remove(field)}
        disabled={ disallowAddRemove}
      />
    </ToolStrip>
  );
};
