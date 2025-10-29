import { ComponentRenderer } from "@Pimcore/modules/app/component-registry/component-renderer";
import { componentConfig } from "@Pimcore/modules/app/component-registry/component-config";
import React from "react";
import { SubscriptionDetailsProps } from "./logo/subscription-details";

export const Logo = (): React.JSX.Element => {
  const subscriptionDetailProps: SubscriptionDetailsProps = {
    icon: 'subscription-community',
    tooltip: 'Learn more about Pimcore Editions',
    link: 'https://pimcore.com/en/products/edition/overview',
    children: <ComponentRenderer component={componentConfig.rightSidebar.logo.image.name} />
  };

  return (
    <ComponentRenderer component={componentConfig.rightSidebar.logo.subscriptionDetails.name} props={subscriptionDetailProps} />
  )
}
}
