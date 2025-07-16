import { Flex } from "@Pimcore/components/flex/flex";
import { Form } from "@Pimcore/components/form/form";
import { Text } from "@Pimcore/components/text/text";
import { AdvancedColumnConfig, useDataObjectGetGridPreviewQuery } from "@Pimcore/modules/data-object/data-object-api-slice.gen";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import { transform } from "lodash";
import React from "react";

export interface PreviewProps {
  column: AvailableColumn
}

export const Preview = (props : PreviewProps): React.JSX.Element => {
  const { column } = props;
  const advancedColumnConfig = column?.__meta?.advancedColumnConfig ?? {};

  const { data } = useDataObjectGetGridPreviewQuery({
    body: {
      column: {
        type: column.type,
        key: column.key,
        config: {
          advancedColumns: advancedColumnConfig.advancedColumns ?? [],
          transformers: advancedColumnConfig.transformers ?? [],
        }
      },
      // @todo check how to get the current objectId
      objectId: 9
    }
  })

  const value = data?.value?.[0]?.value

  return (
    <Flex gap={'small'}>
      <Text>Preview:</Text>
      <Text type="secondary">{value}</Text>
    </Flex>
  )
}
