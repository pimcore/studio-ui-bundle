import React, { useEffect, useMemo } from "react";
import { VariantsContainer } from "./variants-container";
import { useLanguageSelection } from "@Pimcore/components/language-selection";
import { Icon } from "@Pimcore/components/icon/icon";
import { IEditorTab } from "@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab";

export const VariantsTabContainer = (): React.JSX.Element => {
  const { setHasLocalizedFields } = useLanguageSelection();

  useEffect(() => {
    setHasLocalizedFields(true);
  }, [setHasLocalizedFields]);

  return useMemo(() => <VariantsContainer />, []);
}


export const TAB_VARIANTS: IEditorTab = {
  key: 'variants',
  label: 'data-object.object-editor-tabs.variants',
  icon: <Icon value="data-object-variant" />,
  children: <VariantsTabContainer />,
  hidden: (elementApi) => !('allowVariants' in elementApi && elementApi?.allowVariants === true)
}
