import { Flex } from "@Pimcore/components/flex/flex";
import { Form } from "@Pimcore/components/form/form";
import { Text } from "@Pimcore/components/text/text";
import { AdvancedColumnConfig, useDataObjectGetGridPreviewQuery } from "@Pimcore/modules/data-object/data-object-api-slice.gen";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import { transform } from "lodash";
import React from "react";
import { PreviewValue } from "./preview-value";
import { Box } from "@Pimcore/components/box/box";

export interface PreviewProps {
  column: AvailableColumn
}

export const Preview = (props : PreviewProps): React.JSX.Element => {
  const { column } = props;
  const advancedColumnConfig = (column?.__meta?.advancedColumnConfig ?? column.config) as unknown as AdvancedColumnConfig[] | undefined;

  const { data } = useDataObjectGetGridPreviewQuery({
    body: {
      column: {
        type: column.type,
        key: column.key,
        config: advancedColumnConfig
      },
      // @todo check how to get the current objectId
      objectId: 9
    }
  })

  return (
    <Box padding={'small'}>
      <Flex gap={'small'}>
        <Text style={{ wordBreak: 'keep-all' }}>Preview:</Text>
        {data?.value === undefined || data?.value.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <PreviewValue value={data?.value} />
        )}
      </Flex>
    </Box>
  )
}
