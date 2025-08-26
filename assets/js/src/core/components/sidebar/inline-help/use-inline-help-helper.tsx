import { useSidebar } from "../use-sidebar";
import { useInlineHelp } from "./inline-help-provider";
import { sidebarEntry } from "./with-inline-help";

export interface UseInlineHelpHelperReturn {
  open: (component) => void;
}

export const useInlineHelpHelper = (): UseInlineHelpHelperReturn => {
  const sidebar = useSidebar();
  const inlineHelp = useInlineHelp();

  const open = (component) => {
    inlineHelp.setComponent(component);
    sidebar.setActiveTab(sidebarEntry.key);
  };

  return {
    open,
  };
};
