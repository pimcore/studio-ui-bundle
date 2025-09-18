import { useRef, useCallback } from "react";
import { useLanguageSelection } from "@Pimcore/components/language-selection";
import { useColumnMapper, UseColumnMapperReturn } from "@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-column-mapper";

export const useDataObjectColumnMapper = (): UseColumnMapperReturn => {
  const languageSelection = useLanguageSelection();
  const currentLanguageRef = useRef(languageSelection.currentLanguage);
  const { shouldMapDataToColumn: baseShouldMapDataToColumn, ...props } = useColumnMapper();
  currentLanguageRef.current = languageSelection.currentLanguage;

  const shouldMapDataToColumn: UseColumnMapperReturn['shouldMapDataToColumn'] = useCallback((data, column) => {
    const currentLanguage = currentLanguageRef.current;

    if (column.localizable === true && (column.locale === null || column.locale === undefined)) {
      return data.key === column.key && currentLanguage === data.locale;
    }

    return baseShouldMapDataToColumn(data, column);
  }, [baseShouldMapDataToColumn])

  return {
    ...props,
    shouldMapDataToColumn
  }
}
