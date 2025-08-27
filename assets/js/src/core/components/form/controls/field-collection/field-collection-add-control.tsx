import { useTranslation } from "react-i18next";
import { Select, SelectProps } from "../../../select/select";
import { useFieldCollection } from "./field-collection-provider";
import { useNumberedList } from "../numbered-list/provider/numbered-list/use-numbered-list";
import React from "react";

export interface FieldCollectionAddControlProps {
  size?: SelectProps['size']
  field?: number
  disabled?: boolean
}

export const FieldCollectionAddControl = (props: FieldCollectionAddControlProps): React.JSX.Element => {
  const { size = 'small' } = props
  const { registry } = useFieldCollection();
  const { operations } = useNumberedList();
  const { t } = useTranslation();

  const items = registry.getItems();
  const selectOptions: SelectProps['options'] = items.map(item => ({
    label: t(item.translationKey),
    value: item.type,
  }));

  const onSelect: SelectProps['onSelect'] = (value) => {
    operations.add({ type: value, data: {} }, props.field !== undefined ? props.field + 1 : undefined);
  }

  return (
    <Select 
      dropdownStyle={{ width: 200 }} 
      style={{ width: 150 }}
      size={size} 
      placeholder={"Add collection"} 
      options={selectOptions} 
      onSelect={ onSelect } 
      showSearch
      value={null} 
      disabled={props.disabled}
    />
  )
}
