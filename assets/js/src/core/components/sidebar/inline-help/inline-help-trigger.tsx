import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import { IInlineHelpContext, InlineHelpProviderProps } from "./inline-help-provider";
import { useInlineHelpHelper } from "./use-inline-help-helper";
import React from "react";

export interface InlineHelpTriggerProps {
  component: IInlineHelpContext['component']
}

export const InlineHelpTrigger = ({ component }: InlineHelpTriggerProps): React.JSX.Element => {
  const inlineHelpHelper = useInlineHelpHelper();

  return (
    <IconButton
      icon={{ value: 'help-circle' }}
      onClick={() => inlineHelpHelper.open(component)}
    />
  );
};
