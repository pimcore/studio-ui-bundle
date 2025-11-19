import React from "react";
import { AbstractDecoratorProps } from "@sdk/modules/element";
import { GlobalContextSubscriber } from "@Pimcore/modules/element/listing/decorators/global-context/view-layer/global-context-subscriber";
import { useData } from "@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data";

export const withGlobalContextSubscriber = (Component: AbstractDecoratorProps['ViewComponent']): AbstractDecoratorProps['ViewComponent'] => {
  const ViewComponentWithGlobalContextSubscriber = (): React.JSX.Element => {
    const { data } = useData();
    
    return (
      <>
        <Component />

        {data !== undefined && <GlobalContextSubscriber />}
      </>
    );
  }
  
  return ViewComponentWithGlobalContextSubscriber;
}
