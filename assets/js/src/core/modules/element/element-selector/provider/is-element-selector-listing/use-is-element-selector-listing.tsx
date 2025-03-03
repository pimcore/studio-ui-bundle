import { useContext } from "react";
import { IsElementSelectorContext, IsElementSelectorContextProps } from "./is-element-selector-listing-provider";

export interface UseIsElementSelectorListingReturn extends IsElementSelectorContextProps {}

export const useIsElementSelectorListing = (): UseIsElementSelectorListingReturn => {
  const context = useContext(IsElementSelectorContext)

  return {
    isElementSelector: context.isElementSelector
  }
}
