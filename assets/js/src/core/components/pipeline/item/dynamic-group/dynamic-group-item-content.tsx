import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { useInjection } from "@Pimcore/app/depency-injection";
import { Form } from "@Pimcore/components/form/form";
import { useKeyedList } from "@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list";
import { DynamicTypePipelineRegistry } from "@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry";
import React, { useMemo } from "react";

export interface DynamicGroupItemContentProps {
  dynamicTypeRegistryId: string;
}

export const DynamicGroupItemContent = ({ dynamicTypeRegistryId }: DynamicGroupItemContentProps): React.JSX.Element => {
  const { getValueByKey } = useKeyedList();
  const value = getValueByKey('key');
  const type = useMemo(() => value, [value]);
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId);

  const dynType = registry.getDynamicType(type);

  return useMemo(() => {
    return <Form.Item name={'config'}>
      <Form.KeyedList>
        {dynType.getComponent()}
      </Form.KeyedList>
    </Form.Item>
  }, [type]);
}
