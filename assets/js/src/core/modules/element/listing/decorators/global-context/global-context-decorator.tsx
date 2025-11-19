import { withGlobalContextSubscriber } from "@Pimcore/modules/element/listing/decorators/global-context/with-global-context-subscriber";
import { AbstractDecorator, AbstractDecoratorProps } from "@sdk/modules/element";

export const GlobalContextDecorator: AbstractDecorator = (props) => {
  const { ViewComponent } = { ...props };
  
  return {
    ...props,
    ViewComponent: withGlobalContextSubscriber(ViewComponent),
  };
}
