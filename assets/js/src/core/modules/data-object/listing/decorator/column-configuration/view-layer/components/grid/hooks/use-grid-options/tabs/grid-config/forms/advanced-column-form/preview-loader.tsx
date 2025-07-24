import { AdvancedColumnConfig } from "@Pimcore/modules/asset/asset-api-slice.gen";
import { useDataObjectGetGridPreviewQuery } from "@Pimcore/modules/data-object/data-object-api-slice.gen";
import { useData } from "@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import { PreviewValue } from "./preview-value";
import React from "react";
import { Text } from "@Pimcore/components/text/text";

export interface PreviewProps {
  column: AvailableColumn
}

export const PreviewLoader = (props: PreviewProps): React.JSX.Element => {
  const { column } = props;
  const {data: gridData} = useData();
  const firstItem = gridData.items[0];
  const advancedColumnConfig = (column?.__meta?.advancedColumnConfig ?? column.config) as unknown as AdvancedColumnConfig[] | undefined;

  const { data, error } = useDataObjectGetGridPreviewQuery({
    body: {
      column: {
        type: column.type,
        key: column.key,
        config: advancedColumnConfig
      },
      objectId: firstItem?.id // Assuming the first item has an id that can be used as objectId
    }
  });

  console.log({error})

  return (
    <>
      {error !== undefined && <Text type="danger">Error loading preview: {'error' in error ? error?.error : <></>} </Text>}

      {error === undefined ? (
        <>
          {data?.value?.length > 0 ? (
            <PreviewValue value={data?.value} />
          ) : (
            <div>No preview data available</div>
          )}
        </>
      ) : null}
    </>
  );
}
