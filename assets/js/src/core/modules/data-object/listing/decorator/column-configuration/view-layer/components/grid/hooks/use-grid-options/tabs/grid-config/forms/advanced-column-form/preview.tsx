import { Flex } from "@Pimcore/components/flex/flex";
import { Text } from "@Pimcore/components/text/text";
import { AdvancedColumnConfig, useDataObjectGetGridPreviewQuery } from "@Pimcore/modules/data-object/data-object-api-slice.gen";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import React from "react";
import { PreviewValue } from "./preview-value";
import { Box } from "@Pimcore/components/box/box";
import { useData } from "@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data";
import { PreviewLoader } from "./preview-loader";

export interface PreviewProps {
  column: AvailableColumn
}

export const Preview = (props : PreviewProps): React.JSX.Element => {
  const { data: gridData } = useData();
  const hasFirstItem = gridData?.items.length > 0 && gridData?.items?.[0] !== undefined;

  return (
    <Box padding={{ top: 'small', bottom: 'none', x: 'small' }} >
      <Flex gap={'small'} align="center">
        <Text style={{ wordBreak: 'keep-all' }}>Preview:</Text>
        
        {hasFirstItem ? (
          <PreviewLoader column={props.column} />
        ) : (
          <Text type="secondary">No preview item available</Text>
        )}
      </Flex>
    </Box>
  )
}
