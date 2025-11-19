import React from "react";
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useRowSelection } from "@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection";
import { useGlobalContextIdentifiers } from "@Pimcore/modules/element/listing/decorators/global-context/hooks/use-global-context-identifiers";
import { useElementContext } from "@sdk/modules/element";

export const GlobalContextSubscriber = (): React.JSX.Element => {
  const { data } = useData()
  const { selectedRows } = useRowSelection();
  const { elementType } = useElementContext();

  useGlobalContextIdentifiers({ data: data?.items, selectedRows: selectedRows, elementType })

  return <></>;
}
